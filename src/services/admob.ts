import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export class AdMobService {
  private static initialized = false;
  private static isBannerShowing = false;

  static async initialize() {
    // Only initialize on native platforms
    if (!Capacitor.isNativePlatform()) {
      console.log('AdMob skipped: Not a native platform');
      return;
    }

    if (this.initialized) return;

    try {
      await AdMob.initialize({
        initializeForTesting: false,
      });
      this.initialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  }

  static async showBanner() {
    if (!Capacitor.isNativePlatform() || !this.initialized) {
      console.log('AdMob banner skipped: Platform check failed');
      return;
    }

    // Prevent multiple banner calls
    if (this.isBannerShowing) {
      console.log('Banner already showing');
      return;
    }

    try {
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-3375938019790298/8517932699',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      };

      await AdMob.showBanner(options);
      this.isBannerShowing = true;
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
      this.isBannerShowing = false;
    }
  }

  static async hideBanner() {
    if (!Capacitor.isNativePlatform() || !this.isBannerShowing) {
      return;
    }

    try {
      await AdMob.hideBanner();
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  static async removeBanner() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      await AdMob.removeBanner();
      this.isBannerShowing = false;
    } catch (error) {
      console.error('Failed to remove banner ad:', error);
    }
  }

  static async prepareInterstitial() {
    if (!Capacitor.isNativePlatform() || !this.initialized) {
      return;
    }

    try {
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3375938019790298/8758084772',
      });
      console.log('Interstitial ad prepared');
    } catch (error) {
      console.error('Failed to prepare interstitial ad:', error);
    }
  }

  static async showInterstitial() {
    if (!Capacitor.isNativePlatform() || !this.initialized) {
      return;
    }

    try {
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  static addInterstitialListeners() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      console.log('Interstitial ad loaded');
    });

    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      console.log('Interstitial ad dismissed');
      this.prepareInterstitial();
    });

    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
      console.error('Interstitial ad failed to load:', error);
    });
  }
}
