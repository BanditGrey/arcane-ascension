export const specializations = [
  'Arquimago', 'Elementalista', 'Mago de Fogo', 'Mago de Gelo', 'Mago Elétrico',
  'Mago Arcano', 'Necromante', 'Invocador', 'Spellblade', 'Blood Mage',
  'Chaos Mage', 'Time Mage', 'Void Mage', 'Storm Mage', 'Crystal Mage'
];

export class SpecializationSystem {
  current: string = 'Aprendiz';

  choose(spec: string) {
    if (specializations.includes(spec)) {
      this.current = spec;
      console.log(`%c[Especialização] Agora você é: ${spec}`, 'color:#00ffcc');
    }
  }
}