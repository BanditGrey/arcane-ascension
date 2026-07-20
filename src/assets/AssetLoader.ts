export class AssetLoader {
  private static cache: Map<string, HTMLImageElement> = new Map();

  static async load(path: string): Promise<HTMLImageElement> {
    if (this.cache.has(path)) return this.cache.get(path)!;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(path, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = path;
    });
  }

  static get(path: string): HTMLImageElement | null {
    return this.cache.get(path) || null;
  }

  static async preloadAll() {
    const manifest = [
      '/assets/sprites/Mage/archmage_idle_front.png',
      '/assets/sprites/Mage/archmage_walk_side.png',
      '/assets/sprites/Mage/archmage_cast_front.png',
      '/assets/sprites/Projectiles/fireball.png',
      '/assets/sprites/Projectiles/icebolt.png',
      '/assets/sprites/Projectiles/lightning.png',
      '/assets/sprites/Projectiles/shadow_bolt.png',
      '/assets/sprites/Enemies/goblin_mage.png',
      '/assets/sprites/Enemies/skeleton_mage.png',
      '/assets/sprites/Effects/explosion_fire.png',
      '/assets/sprites/Effects/impact_ice.png',
      '/assets/sprites/Effects/aura_arcane.png',
    ];
    
    await Promise.all(manifest.map(p => this.load(p)));
    console.log('%c[Assets] Todos os sprites reais carregados!', 'color:#44ffaa');
  }
}