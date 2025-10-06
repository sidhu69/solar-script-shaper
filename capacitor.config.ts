import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.celestial.oracle',
  appName: 'Celestial Oracle',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
