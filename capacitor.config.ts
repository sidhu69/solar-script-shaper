import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.celestial.oracle',
  appName: 'Cosmic Astrology Ai',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
