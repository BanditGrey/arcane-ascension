import { spells } from '../data/spells';
import { Inventory } from '../systems/Inventory';
import { ProficiencySystem } from '../systems/ProficiencySystem';
import { SpecializationSystem } from '../systems/Specialization';
import { ParticleSystem } from '../vfx/ParticleSystem';
import { SkillTree } from '../systems/SkillTree';
import { EquipmentSystem } from '../systems/EquipmentSystem';
import { AssetLoader } from '../assets/AssetLoader';
import { StaffRenderer } from './StaffRenderer';
import { AppearanceSystem } from '../systems/AppearanceSystem';
import { OfflineProgress } from '../systems/OfflineProgress';
import { PhaseSystem } from '../systems/PhaseSystem';

export class Player {
  x: number = 400;
  y: number = 360;
  speed: number = 4.8;
  hp: number = 120;
  maxHp: number = 120;
  mana: number = 220;
  maxMana: number = 220;
  level: number = 1;
  experience: number = 0;
  experienceToLevel: number = 100;

  // Bônus de Aparência
  spellDamageMultiplier: number = 1;
  intelligence: number = 0;

  inventory = new Inventory();
  proficiencies = new ProficiencySystem();
  specialization = new SpecializationSystem();
  particles = new ParticleSystem();
  skillTree = new SkillTree();
  equipment = new EquipmentSystem();
  appearance = new AppearanceSystem();
  offline = new OfflineProgress();
  phases = new PhaseSystem();

  lastSpellTime: Record<string, number> = {};
  animationFrame: number = 0;
  state: string = 'idle';
  currentSpell: string = 'fireball';

  constructor() {
    this.inventory.addItem({ 
      id: 'staff_basic', 
      name: 'Cajado de Aprendiz', 
      type: 'Cajado', 
      rarity: 'Comum', 
      stats: { intelligence: 8 }, 
      description: '' 
    });
  }

  update(delta: number) {
    // Idle mode - mago fica parado no centro
    this.state = 'idle';
    this.animationFrame = (this.animationFrame + 1) % 12;

    // Aura de partículas constante (mais idle)
    if (Math.random() < 0.35) {
      this.particles.emit(this.x, this.y - 15, 1, '#6644ff', 1.2);
    }
    this.particles.update();
  }

  castSpell(targetX: number, targetY: number, ctx: CanvasRenderingContext2D) {
    const spell = spells[this.currentSpell] || spells.fireball;
    const now = Date.now();

    if ((this.lastSpellTime[spell.id] || 0) + spell.cooldown > now) return;
    if (this.mana < spell.manaCost) return;

    this.mana -= spell.manaCost;
    this.lastSpellTime[spell.id] = now;
    this.state = 'cast';

    // Aplica bônus de dano da aparência
    const finalDamage = Math.floor(spell.damage * (this.spellDamageMultiplier || 1));

    // === EFEITO DE CAST BASEADO NO CAJADO ===
    const weapon = this.equipment.equipped.weapon;
    let castColor = spell.projectileColor;
    let intensity = 12;

    if (weapon) {
      const name = weapon.name.toLowerCase();
      const isHighRarity = weapon.rarity === 'Lendário' || weapon.rarity === 'Mítico' || weapon.rarity === 'Ancestral';

      if (name.includes('fogo') || name.includes('fire')) castColor = '#ff5500';
      else if (name.includes('gelo') || name.includes('ice')) castColor = '#88ddff';
      else if (name.includes('raio') || name.includes('lightning')) castColor = '#ffff66';
      else if (name.includes('vazio') || name.includes('void')) castColor = '#aa44ff';
      else if (name.includes('cristal') || name.includes('crystal')) castColor = '#ff77ee';

      if (isHighRarity) intensity = 20;
    }

    // Efeito visual de cast
    this.particles.emit(this.x, this.y - 10, intensity, castColor, 5);

    return { targetX, targetY, spell, finalDamage };
  }

  switchSpell(spellId: string) {
    if (spells[spellId]) {
      this.currentSpell = spellId;
      console.log(`%c[Hotbar] Mudou para: ${spells[spellId].name}`, 'color:#88ddff');
    }
  }

  // === SISTEMA DE EQUIPAMENTO DE CAJADOS ===
  equipStaff(staffId: string) {
    const testStaffs: any = {
      'staff_basic':   { id: 'staff_basic', name: 'Cajado de Aprendiz', type: 'Cajado', rarity: 'Comum', stats: {} },
      'staff_fire':    { id: 'staff_fire', name: 'Cajado Flamejante', type: 'Cajado', rarity: 'Raro', stats: { 'fire damage': 14 } },
      'staff_ice':     { id: 'staff_ice', name: 'Cajado Congelante', type: 'Cajado', rarity: 'Raro', stats: { 'ice damage': 12 } },
      'staff_lightning': { id: 'staff_lightning', name: 'Cajado do Raio', type: 'Cajado', rarity: 'Épico', stats: {} },
      'staff_shadow':  { id: 'staff_shadow', name: 'Cajado Sombrio', type: 'Cajado', rarity: 'Épico', stats: {} },
      'staff_crystal': { id: 'staff_crystal', name: 'Cajado de Cristal', type: 'Cajado', rarity: 'Lendário', stats: {} },
      'staff_arcane':  { id: 'staff_arcane', name: 'Cajado Arcano', type: 'Cajado', rarity: 'Épico', stats: {} },
      'staff_void':    { id: 'staff_void', name: 'Cajado do Vazio', type: 'Cajado', rarity: 'Lendário', stats: {} },
    };

    const staffData = testStaffs[staffId];
    if (staffData) {
      this.equipment.equip(staffData, 'weapon');
      console.log(`%c[Cajado] Equipado: ${staffData.name}`, 'color:#ffaa33');

      // Efeito visual ao equipar
      this.particles.emit(this.x, this.y - 20, 18, '#aabbff', 4);
    }
  }

  // Sistema de evolução visual do mago por nível
  getMageSprite() {
    const level = this.level;

    if (level >= 60) {
      return AssetLoader.get('/assets/sprites/Mage/mage_elder.png');
    } else if (level >= 35) {
      return AssetLoader.get('/assets/sprites/Mage/mage_veteran.png');
    } else if (level >= 15) {
      return AssetLoader.get('/assets/sprites/Mage/mage_adult.png');
    } else {
      return AssetLoader.get('/assets/sprites/Mage/mage_young.png');
    }
  }

  getMageCastSprite() {
    const level = this.level;

    if (level >= 60) {
      return AssetLoader.get('/assets/sprites/Mage/mage_elder_cast.png');
    } else if (level >= 35) {
      return AssetLoader.get('/assets/sprites/Mage/mage_veteran_cast.png');
    } else if (level >= 15) {
      return AssetLoader.get('/assets/sprites/Mage/mage_adult_cast.png');
    } else {
      return AssetLoader.get('/assets/sprites/Mage/mage_young_cast.png');
    }
  }

  // Retorna os bônus permanentes da aparência atual
  getAppearanceBonuses() {
    return this.appearance.getTotalBonuses(this.level);
  }

  gainExperience(amount: number) {
    this.experience += amount;

    while (this.experience >= this.experienceToLevel) {
      this.levelUp();
    }
  }

  levelUp() {
    this.experience -= this.experienceToLevel;
    this.level++;
    this.experienceToLevel = Math.floor(this.experienceToLevel * 1.35);

    // Aplica bônus de aparência ao subir de nível
    this.applyAppearanceBonuses();

    console.log(`%c[Level Up] Você alcançou o nível ${this.level}!`, 'color:#ffdd44; font-weight:bold');
  }

  // Aplica bônus da aparência nos status base
  applyAppearanceBonuses() {
    const bonuses = this.getAppearanceBonuses();

    // Dano mágico
    if (bonuses['spell damage']) {
      // Vamos usar um multiplicador simples
      this.spellDamageMultiplier = 1 + (bonuses['spell damage'] / 100);
    }

    // Mana máxima
    if (bonuses.mana) {
      const bonusMana = bonuses.mana;
      this.maxMana = 220 + bonusMana;
    }

    // Inteligência (afeta dano)
    if (bonuses.intelligence) {
      this.intelligence = bonuses.intelligence;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const currentSprite = this.getMageSprite();

    // Aura mágica mais elegante
    const auraSize = 32 + Math.min(this.level * 0.35, 28);
    ctx.save();
    ctx.shadowColor = '#6644ff';
    ctx.shadowBlur = 22 + Math.min(this.level / 3, 18);
    ctx.fillStyle = 'rgba(102, 68, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y - 6, auraSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const bob = this.state === 'walk' ? Math.sin(this.animationFrame * 0.6) * 2 : 0;
    const castSprite = this.getMageCastSprite();

    // Desenha o mago
    if (this.state === 'cast' && castSprite) {
      ctx.drawImage(castSprite, this.x - 32, this.y + bob - 48, 64, 82);
    } else if (currentSprite) {
      ctx.drawImage(currentSprite, this.x - 32, this.y + bob - 48, 64, 82);
    } else {
      // Fallback simples
      ctx.fillStyle = '#3a1a7a';
      ctx.beginPath();
      ctx.arc(this.x, this.y + bob, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // === CAJADO DINÂMICO ===
    const staffSprite = StaffRenderer.getStaffSprite(this.equipment);
    if (staffSprite) {
      ctx.drawImage(staffSprite, this.x + 16, this.y + bob - 50, 20, 60);
    }

    // Partículas
    this.particles.render(ctx);

    // Nome do personagem
    ctx.fillStyle = '#aaccff';
    ctx.font = '14px Arial';
    ctx.fillText(this.specialization.current, this.x - 40, this.y - 55);
  }
}