export class CraftingSystem {
  recipes = [
    { id: 'fire_staff', name: 'Cajado Flamejante', materials: { 'fire_essence': 5, 'staff_basic': 1 }, result: 'staff_fire_1' },
    { id: 'arcane_ring', name: 'Anel Arcano', materials: { 'arcane_crystal': 3, 'gold': 500 }, result: 'ring_arcane' },
  ];

  canCraft(recipeId: string, inventory: any): boolean {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe) return false;

    return Object.entries(recipe.materials).every(([mat, qty]) => {
      const item = inventory.items.find((i: any) => i.id === mat);
      return item && item.quantity >= qty;
    });
  }

  craft(recipeId: string, inventory: any) {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe || !this.canCraft(recipeId, inventory)) return null;

    // Remove materiais
    Object.entries(recipe.materials).forEach(([mat, qty]) => {
      const index = inventory.items.findIndex((i: any) => i.id === mat);
      if (index !== -1) inventory.items[index].quantity -= qty;
    });

    return recipe.result;
  }
}