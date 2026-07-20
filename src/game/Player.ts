import { InputManager } from './InputManager';
import { spells } from '../data/spells';
import { Inventory } from '../systems/Inventory';
import { ProficiencySystem } from '../systems/ProficiencySystem';
import { SpecializationSystem } from '../systems/Specialization';
import { ParticleSystem } from '../vfx/ParticleSystem';
import { SkillTree } from '../systems/SkillTree';
import { EquipmentSystem } from '../systems/EquipmentSystem';
import { AssetLoader } from '../assets/AssetLoader';

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

  inventory = new Inventory();
  proficiencies = new ProficiencySystem();
  specialization = new SpecializationSystem();
  particles = new ParticleSystem();
  skillTree = new SkillTree();
  equipment = new EquipmentSystem();

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

  update(delta: number, input: InputManager) {
    let dx = 0, dy = 0;
    let moving = false;

    if (input.keys['w'] || input.keys['W']) { dy -= 1; moving = true; }
    if (input.keys['s'] || input.keys['S']) { dy += 1; moving = true; }
    if (input.keys['a'] || input.keys['A']) { dx -= 1; moving = true; }
    if (input.keys['d'] || input.keys['D']) { dx += 1; moving = true; }

    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

    this.x += dx * this.speed;
    this.y += dy * this.speed;

    this.x = Math.max(20, Math.min(1260, this.x));
    this.y = Math.max(20, Math.min(700, this.y));

    // Estado de animação
    this.state = moving ? 'walk' : 'idle';
    this.animationFrame = (this.animationFrame + 1) % 12;

    // Aura de partículas constante
    if (Math.random() < 0.4) {
      this.particles.emit(this.x, this.y - 15, 1, '#6644ff', 1.5);
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

    // Efeito visual de cast
    this.particles.emit(this.x, this.y - 10, 12, spell.projectileColor, 4);

    return { targetX, targetY, spell };
  }

  switchSpell(spellId: string) {
    if (spells[spellId]) {
      this.currentSpell = spellId;
      console.log(`%c[Hotbar] Mudou para: ${spells[spellId].name}`, 'color:#88ddff');
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const mageIdle = AssetLoader.get('/assets/sprites/Mage/archmage_idle_front.png');
    const mageWalk = AssetLoader.get('/assets/sprites/Mage/archmage_walk_side.png');
    const mageCast = AssetLoader.get('/assets/sprites/Mage/archmage_cast_front.png');

    // Aura mágica
    ctx.save();
    ctx.shadowColor = '#6644ff';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(102, 68, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(this.x, this.y - 8, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const bob = this.state === 'walk' ? Math.sin(this.animationFrame * 0.6) * 2.5 : 0;

    // Desenha sprite real do mago
    if (this.state === 'cast' && mageCast) {
      ctx.drawImage(mageCast, this.x - 28, this.y + bob - 42, 56, 72);
    } else if (this.state === 'walk' && mageWalk) {
      ctx.drawImage(mageWalk, this.x - 28, this.y + bob - 42, 56, 72);
    } else if (mageIdle) {
      ctx.drawImage(mageIdle, this.x - 28, this.y + bob - 42, 56, 72);
    } else {
      ctx.fillStyle = '#3a1a7a';
      ctx.beginPath();
      ctx.arc(this.x, this.y + bob, 23, 0, Math.PI * 2);
      ctx.fill();
    }

    // Partículas
    this.particles.render(ctx);

    // Nome
    ctx.fillStyle = '#aaccff';
    ctx.font = '13px Arial';
    ctx.fillText(this.specialization.current, this.x - 38, this.y - 48);
  }
}