import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.celestial.oracle',
  appName: 'Cosmic Astrology AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      packageType: 'bundle'
    }
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3375938019790298~8473700666',
      testingDevices: []
    }
  }
};

export default config;
