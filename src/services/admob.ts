import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';

export class AdMobService {
  private static initialized = false;
  
  static async initialize() {
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
    try {
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-3375938019790298/8517932699',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      };
      
      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  static async hideBanner() {
    try {
      await AdMob.hideBanner();
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  static async removeBanner() {
    try {
      await AdMob.removeBanner();
    } catch (error) {
      console.error('Failed to remove banner ad:', error);
    }
  }

  static async prepareInterstitial() {
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
    try {
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  static addInterstitialListeners() {
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      console.log('Interstitial ad loaded');
    });

    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      console.log('Interstitial ad dismissed');
      // Prepare next interstitial
      this.prepareInterstitial();
    });

    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
      console.error('Interstitial ad failed to load:', error);
    });
  }
}
