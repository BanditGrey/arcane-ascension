export interface ForgeRecipe {
  id: string;
  name: string;
  materials: Record<string, number>;
  result: {
    id: string;
    name: string;
    rarity: string;
    stats: Record<string, number>;
  };
}

export const forgeRecipes: ForgeRecipe[] = [
  {
    id: 'fire_staff',
    name: 'Cajado Flamejante',
    materials: { 'fire_essence': 5, 'wood': 10 },
    result: {
      id: 'staff_fire',
      name: 'Cajado Flamejante',
      rarity: 'Raro',
      stats: { 'fire damage': 14, intelligence: 8 }
    }
  },
  {
    id: 'arcane_ring',
    name: 'Anel Arcano',
    materials: { 'arcane_crystal': 3, 'gold': 500 },
    result: {
      id: 'ring_arcane',
      name: 'Anel Arcano',
      rarity: 'Épico',
      stats: { intelligence: 25, mana: 40 }
    }
  }
];

export class ForgeSystem {
  canCraft(recipeId: string, inventory: any): boolean {
    const recipe = forgeRecipes.find(r => r.id === recipeId);
    if (!recipe) return false;

    return Object.entries(recipe.materials).every(([mat, qty]) => {
      return inventory.items.some((item: any) => item.id === mat && item.quantity >= qty);
    });
  }

  craft(recipeId: string, inventory: any) {
    const recipe = forgeRecipes.find(r => r.id === recipeId);
    if (!recipe || !this.canCraft(recipeId, inventory)) return null;

    // Remove materiais
    Object.entries(recipe.materials).forEach(([mat, qty]) => {
      const item = inventory.items.find((i: any) => i.id === mat);
      if (item) item.quantity -= qty;
    });

    // Adiciona resultado
    inventory.items.push({
      ...recipe.result,
      quantity: 1
    });

    return recipe.result;
  }
}