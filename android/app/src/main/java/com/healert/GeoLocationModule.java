package com.healert;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.Handler;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

import java.util.Date;
import com.google.gson.Gson;
import static android.os.Looper.getMainLooper;
import static io.invertase.firebase.app.ReactNativeFirebaseApp.getApplicationContext;

/**

 * Created by AGulchenko on 5/7/18.

 */

public class GeoLocationModule extends ReactContextBaseJavaModule {

    public static final String CHANNEL_ID = "ExampleService_Channel";
    private FusedLocationProviderClient mFusedLocationClient;
    private LocationCallback mLocationCallback;
    private Gson mGson;
    public GeoLocationModule(ReactApplicationContext reactContext) {

        super(reactContext);
        mGson = new Gson();
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            NotificationChannel channel = new NotificationChannel(CHANNEL_ID,"testName", NotificationManager.IMPORTANCE_DEFAULT);

            NotificationManager manager = reactContext.getSystemService(NotificationManager.class);

            manager.createNotificationChannel(channel);

        }

    }

    @Override

    public String getName() {

        return "GeoLocation";

    }

    @ReactMethod

    public void startService(String token, String user_id, String id, String url_string, Promise promise) {

        WritableMap result = Arguments.createMap();

        result.putString("status", "success");

        try {

            Intent serviceIntent = new Intent(getReactApplicationContext(), GeoLocationModule.class);

            serviceIntent.putExtra("token", token);

            serviceIntent.putExtra("user_id", user_id);

            serviceIntent.putExtra("id", id);

            serviceIntent.putExtra("url_string", url_string);

            getReactApplicationContext().startService(serviceIntent);

            promise.resolve(result);

        } catch (Exception e) {

            e.printStackTrace();

            promise.reject("rrrrr",e);

            return;

        }

    }

    @ReactMethod

    public void stopService(Promise promise) {

        String result = "Success";

        try {

            Intent serviceIntent = new Intent(getReactApplicationContext(), GeoLocationModule.class);

            getReactApplicationContext().stopService(serviceIntent);

        } catch (Exception e) {

            promise.reject(e);

            return;

        }

        promise.resolve(result);

    }

    @ReactMethod

    public void getLocation( Promise promise) {

        WritableMap res = Arguments.createMap();

        try {
            mFusedLocationClient = LocationServices.getFusedLocationProviderClient(getApplicationContext());
            mLocationCallback = createLocationRequestCallback();

            LocationRequest locationRequest = LocationRequest.create()
                    .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY)
                    .setInterval(1)
                    .setFastestInterval(0);

            new Handler(getMainLooper()).post(() -> mFusedLocationClient.requestLocationUpdates(locationRequest, mLocationCallback, null));

            LocationManager locationManager = null;

            locationManager = (LocationManager) this.getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);

            int permissionCheck = ContextCompat.checkSelfPermission(this.getReactApplicationContext(),

                    android.Manifest.permission.ACCESS_FINE_LOCATION);

            if (permissionCheck == PackageManager.PERMISSION_GRANTED) {

                Criteria criteria = new Criteria();

                String bestProvider = locationManager.getBestProvider(criteria, false);

                Location location = locationManager.getLastKnownLocation(bestProvider);

                if(location != null) {

                    res.putDouble("latitude", location.getLatitude());

                    res.putDouble("longitude", location.getLongitude());

                    promise.resolve(res);

                }

            }

        } catch (Exception e) {
            System.out.println("Getting location Error "+e);
            promise.reject(e);

            return;

        }

    }

    private LocationCallback createLocationRequestCallback() {
        return new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null) {
                    return;
                }
                for (Location location : locationResult.getLocations()) {
                    LocationCoordinates locationCoordinates = createCoordinates(location.getLatitude(), location.getLongitude());
                    broadcastLocationReceived(locationCoordinates);
                    mFusedLocationClient.removeLocationUpdates(mLocationCallback);
                }
            }
        };
    }

    private void broadcastLocationReceived(LocationCoordinates locationCoordinates) {
        System.out.println("Broadcasting Events");
        System.out.println(mGson.toJson(locationCoordinates));
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("testEvent", mGson.toJson(locationCoordinates));
    }

    private LocationCoordinates createCoordinates(double latitude, double longitude) {
        return new LocationCoordinates()
                .setLatitude(latitude)
                .setLongitude(longitude)
                .setTimestamp(new Date().getTime());
    }

}