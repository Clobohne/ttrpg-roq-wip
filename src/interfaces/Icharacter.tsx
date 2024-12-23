import { Skill } from "./Iskills";


export interface Stat {
    key: string;
    amount: number;
}

/**
 * Base attributes for any character, regardless of type.
 */
export interface BaseCharacter {
    id: string; // Unique identifier for the character
    name: string; // Name of the character
    health: Stat; // Current health points
    maxHealth: Stat; // Maximum health points
    level: Stat; // Character level
    attributes: Attributes; // Core attributes
    imageUrl: string;
    inventory: InventoryItem[]; // List of inventory items
}

/**
 * Attributes defining the character's capabilities.
 */
export interface Attributes {
    strength: Stat; // Core attribute
    agility: Stat; // Core attribute
    intelligence: Stat; // Core attribute
    endurance: Stat; // Core attribute
    charisma: Stat; // Optional: Core attribute
    [key: string]: Stat; // Dynamic attributes
}

/**
 * An item that can be stored in the character's inventory.
 */
export interface InventoryItem {
    id: string; // Unique identifier for the item
    name: string; // Name of the item
    type: ItemType; // Type of item (weapon, armor, potion, etc.)
    description?: string; // Optional description of the item
    quantity: number; // Number of items in the stack
}

export interface Buff {
    id: string;
    name: string;
    description: string;
    duration: number;
    statModifiers: Partial<Attributes>;
}

/**
 * Enum for inventory item types. LIMIT THE CHOICES of TYPE!!!!!
 */
export enum ItemType {
    Weapon = "Weapon",
    Armor = "Armor",
    Consumable = "Potion",
    Miscellaneous = "Miscellaneous",
}

/**
 * Specialized interface for player-controlled characters.
 */
export interface PlayerCharacter extends BaseCharacter {
    experience: number; // Current experience points
    experienceToNextLevel: number; // Points needed for the next level
    skills: Skill[]; // List of learned skills
}

/**
 * Specialized interface for non-player characters.
 */
export interface NonPlayerCharacter extends BaseCharacter {
    isHostile: boolean; // Whether the NPC is hostile to the player
}




// Enum to represent the possible target types for effects
export enum AffectedTargetType {
    SELF = 'self',
    ENEMY = 'enemy',
    ALLY = 'ally',
    ANY = 'any',
  }

  // Interface to represent dice structure with possible default values
  export interface Dice {
    amount: number;
    sides: number;
    flat: number;
  }
  
export interface Roll {
    physicalDamage: number;
    magicalDamage: number;
    defenceRoll: number;
    skillCheck: number;
}

  // Use Record for dynamic boolean flags instead of a massive list of individual boolean properties
  export type CheckMeForEffectsActive = Record<string, boolean>;
  
  // A more detailed and type-safe StatsIncrease interface
  export interface StatBonus {
    // MANDATORY
    // Affects which stats the increase applies to
    checkMe: CheckMeForEffectsActive;
  
    // Array of affected targets and their corresponding amounts
    affectedTargets: {
      target: AffectedTargetType; // Type of the target (e.g., self, enemy, etc.)
      amount: number; // Amount associated with the target (e.g., allyAmount, enemyAmount)
    }[];
  
    // Indicates whether the increase is flat or multiplicative
    flatOrMultiplicative: 'flat' | 'multiplicative';
  

    // OPTIONAL
    // Dice related to physical and magical effects
    physicalDice?: Dice;
    magicalDice?: Dice;
  
    // Optional total rolls for different categories (e.g., damage, defense, skill check)
    totalRoll?: Roll;
  
    // Optional field for specific skill checks, such as social or persuasive
    affectedSkillCheck?: string;
  }
  