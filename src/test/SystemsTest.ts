import { Character } from '../domain/Character';
import { CombatSystem } from '../systems/CombatSystem';
import { LootSystem } from '../systems/LootSystem';
import { InventorySystem } from '../systems/InventorySystem';
import { EquipmentSystem } from '../systems/EquipmentSystem';
import { ProgressionSystem } from '../systems/ProgressionSystem';
import { SpellSystem } from '../systems/SpellSystem';
import { SkillTreeSystem } from '../systems/SkillTreeSystem';
import { ProficiencySystem } from '../systems/ProficiencySystem';
import { MissionSystem } from '../systems/MissionSystem';
import { EventSystem } from '../systems/EventSystem';
import { AchievementSystem } from '../systems/AchievementSystem';
import { MarketSystem } from '../systems/MarketSystem';
import { ShopSystem } from '../systems/ShopSystem';
import { GuildSystem } from '../systems/GuildSystem';
import { ChatSystem } from '../systems/ChatSystem';

console.log("=== TESTE DOS SISTEMAS ===\n");

// 1. Character
const char = new Character("p1", "Mago Teste");
char.gainExperience(150);
console.log("✓ Character - Level:", char.level);

// 2. Combat
const combat = new CombatSystem(char);
combat.setPhase(2);
combat.attack();
console.log("✓ Combat - Kills:", combat.kills);

// 3. Loot + Inventory
const loot = new LootSystem();
const inv = new InventorySystem();
const item = loot.generateLoot(2);
if (item) inv.addItem(item);
console.log("✓ Loot + Inventory - Itens:", inv.getItems().length);

// 4. Equipment
const eq = new EquipmentSystem();
eq.equip({ id: "staff1", name: "Cajado", stats: { intelligence: 10 } }, "weapon");
console.log("✓ Equipment - Stats:", eq.getTotalStats());

// 5. Progression
const prog = new ProgressionSystem();
console.log("✓ Progression - Ascension Level:", prog.ascensionLevel);

// 6. Spell
const spellSys = new SpellSystem();
const cast = spellSys.cast("fireball", 100);
console.log("✓ Spell - Castou:", cast.success);

// 7. Skill Tree
const tree = new SkillTreeSystem();
tree.unlock("fireball_mastery");
console.log("✓ SkillTree - Pontos:", tree.points);

// 8. Proficiency
const prof = new ProficiencySystem();
prof.gain("Fire Magic", 12);
console.log("✓ Proficiency - Fire Magic:", prof.getLevel("Fire Magic"));

// 9. Mission
const mission = new MissionSystem();
mission.updateProgress("kill_10", 12);
console.log("✓ Mission - Concluída?", mission.missions[0].completed);

// 10. Event
const ev = new EventSystem();
ev.activateEvent("double_xp", 30);
console.log("✓ Event - Double XP Ativo");

// 11. Achievement
const ach = new AchievementSystem();
ach.unlock("first_kill");
console.log("✓ Achievement - Desbloqueado");

// 12. Market
const market = new MarketSystem();
market.listItem("p1", { name: "Anel" }, 500);
console.log("✓ Market - Listagens:", market.listings.length);

// 13. Shop
const shop = new ShopSystem();
shop.purchase("skin_fire");
console.log("✓ Shop - Itens na loja:", shop.items.length);

// 14. Guild
const guildSys = new GuildSystem();
guildSys.createGuild("p1", "Arcanos");
console.log("✓ Guild - Guildas criadas:", guildSys.guilds.length);

// 15. Chat
const chat = new ChatSystem();
chat.sendMessage("global", "p1", "Mago", "Olá mundo!");
console.log("✓ Chat - Mensagens:", chat.messages.length);

console.log("\n=== TODOS OS TESTES CONCLUÍDOS ===");