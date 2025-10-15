import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.celestial.oracle',
  appName: 'Cosmic Astrology Ai',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3375938019790298~8473700663',
      testingDevices: [],
    }
  }
};

export default config;
