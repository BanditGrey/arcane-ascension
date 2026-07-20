// Simulação de modelo de banco de dados
export interface UserModel {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

export interface CharacterModel {
  id: string;
  userId: string;
  name: string;
  level: number;
  experience: number;
  equipment: any;
  inventory: any[];
  proficiencies: Record<string, number>;
}

export interface GuildModel {
  id: string;
  name: string;
  leaderId: string;
  members: string[];
}

export class DatabaseModel {
  // Em um projeto real, aqui seria a conexão com MongoDB, PostgreSQL, etc.
  static saveCharacter(character: CharacterModel) {
    console.log('[DB] Personagem salvo:', character.name);
  }

  static loadCharacter(userId: string) {
    console.log('[DB] Carregando personagem do usuário:', userId);
    return null;
  }
}