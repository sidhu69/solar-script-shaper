# Add project specific ProGuard rules here.

# Keep AdMob classes
-keep class com.google.android.gms.ads.** { *; }
-keep interface com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Keep Capacitor
-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keepclassmembers class * {
    @com.getcapacitor.annotation.CapacitorMethod *;
}

# Keep Supabase
-keep class io.supabase.** { *; }
-dontwarn io.supabase.**

# Keep JavaScript Interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Optimization passes
-optimizationpasses 5
-dontusemixedcaseclassnames
-verbose

# Remove logging in production to reduce APK size
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
    public static *** w(...);
}
