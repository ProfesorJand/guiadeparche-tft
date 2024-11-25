const sinergiasData = [
  {
      "apiName": "TFT13_Hextech",
      "desc": "Automata gain a crystal when they deal damage. At @TriggerNumCrystals@&nbsp;crystals, they blast their current target, dealing magic damage + <magicDamage>@ConversionDamagePct*100@%</magicDamage> of damage dealt since the previous blast and reset. They also gain Armor and Magic&nbsp;Resist.<br><br><expandRow>(@MinUnits@) <magicDamage>@MagicDamage@</magicDamage> damage, @Resists@&nbsp;%i:scaleArmor%%i:scaleMR%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "ConversionDamagePct": 0.25,
                  "MagicDamage": 150,
                  "Resists": 20,
                  "TriggerNumCrystals": 20,
                  "{a142f31c}": 1
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "ConversionDamagePct": 0.25,
                  "MagicDamage": 350,
                  "Resists": 50,
                  "TriggerNumCrystals": 20,
                  "{a142f31c}": 1
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "ConversionDamagePct": 0.25,
                  "MagicDamage": 800,
                  "Resists": 100,
                  "TriggerNumCrystals": 20,
                  "{a142f31c}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Automata.TFT_Set13.tex",
      "name": "Automata"
  },
  {
      "apiName": "TFT13_Teamup_Menaces",
      "desc": "Powder gains Dominator but no longer benefits from Family. When her monkey explodes, it creates @NumMonstrosities@ of Silco's monstrosities.",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "NumMonstrosities": 3
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_Menaces.TFT_Set13.tex",
      "name": "Menaces"
  },
  {
      "apiName": "TFT13_Sorcerer",
      "desc": "Your team gains @TeamAP@ Ability Power. Sorcerers gain more.<br><br><row>(@MinUnits@) @BaseAP@&nbsp;%i:scaleAP%</row><br><row>(@MinUnits@) @BaseAP@&nbsp;%i:scaleAP%</row><br><row>(@MinUnits@) @BaseAP@&nbsp;%i:scaleAP%</row><br><row>(@MinUnits@) @BaseAP@&nbsp;%i:scaleAP%, Abilities reduce their target's damage by @DamageDecrease*100@% for @DamageDecreaseDuration@&nbsp;seconds</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "BaseAP": 20,
                  "TeamAP": 10
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "BaseAP": 50,
                  "TeamAP": 10
              }
          },
          {
              "maxUnits": 7,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BaseAP": 85,
                  "TeamAP": 10
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 8,
              "style": 5,
              "variables": {
                  "BaseAP": 100,
                  "DamageDecrease": 0.25,
                  "DamageDecreaseDuration": 3,
                  "TeamAP": 10
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_3_Sorcerer.tex",
      "name": "Sorcerer"
  },
  {
      "apiName": "TFT13_Scrap",
      "desc": "Combat start: Components held by Scrap units temporarily turn into full items. Scrap units gain Shield for @ShieldDuration@ seconds for each component held by your team, including those that make up a full item.<br><br><row>(@MinUnits@) @NumComponents@ component, @HPShieldAmount@ Shield</row><br><row>(@MinUnits@) @NumComponents@ components, @HPShieldAmount@ Shield</row><br><row>(@MinUnits@) All components, and full items become lucky! @HPShieldAmount@ Shield</row><br><row>(@MinUnits@) Generate Radiant items! @HPShieldAmount@ Shield</row><br><br><rules>Shield Amount:&nbsp;@TFTUnitProperty.:TFT13_Trait_Scrap_ShieldTotal@ </rules> <br>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "HPShieldAmount": 25,
                  "NumComponents": 1,
                  "ShieldDuration": 30,
                  "{659aef8d}": null,
                  "{7e2474c8}": null
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "HPShieldAmount": 40,
                  "NumComponents": 3,
                  "ShieldDuration": 30,
                  "{659aef8d}": null,
                  "{7e2474c8}": null
              }
          },
          {
              "maxUnits": 8,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "HPShieldAmount": 60,
                  "NumComponents": 20,
                  "ShieldDuration": 30,
                  "{659aef8d}": 1,
                  "{7e2474c8}": null
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 9,
              "style": 5,
              "variables": {
                  "HPShieldAmount": 70,
                  "NumComponents": 20,
                  "ShieldDuration": 30,
                  "{659aef8d}": 1,
                  "{7e2474c8}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_6_Scrap.tex",
      "name": "Scrap"
  },
  {
      "apiName": "TFT13_Martialist",
      "desc": "Every @NumOfAttacks@ attacks, Artillerists launch a rocket that deals @PercentDamage*100@% Attack Damage around the target. They also gain Attack Damage.<br><br><row>(@MinUnits@) @AD*100@% %i:scaleAD%</row><br><row>(@MinUnits@) @AD*100@%&nbsp;%i:scaleAD%</row><br><row>(@MinUnits@) @AD*100@%&nbsp;%i:scaleAD%, Launch a rocket every @NumOfAttacks@ attacks that deals double&nbsp;damage.</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "AD": 0.10000000149011612,
                  "NumOfAttacks": 5,
                  "PercentDamage": 1.25
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "AD": 0.4000000059604645,
                  "NumOfAttacks": 5,
                  "PercentDamage": 1.25
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "AD": 0.5,
                  "NumOfAttacks": 4,
                  "PercentDamage": 2.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Artillerist.TFT_Set13.tex",
      "name": "Artillerist"
  },
  {
      "apiName": "TFT13_FormSwapper",
      "desc": "Innate: Form Swappers change their stats and ability based on if they're placed in the front 2 rows or back 2&nbsp;rows.<br><br>Frontline Form Swappers gain Durability. Backline Form Swappers gain Damage&nbsp;Amp.<br><br><expandRow>(@MinUnits@) @DR*100@%&nbsp;%i:scaleDR% or @DA*100@%&nbsp;%i:scaleDA%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "DA": 0.20000000298023224,
                  "DR": 0.15000000596046448
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "DA": 0.4000000059604645,
                  "DR": 0.30000001192092896
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_FormSwapper.TFT_Set13.tex",
      "name": "Form Swapper"
  },
  {
      "apiName": "TFT13_Ambassador",
      "desc": "This trait is active only when you have exactly 1 or 4 unique Emissaries. <br><br><row>(@MinUnits@) Gain that Emissary's bonus</row><br><row>(@MinUnits@) Gain all bonuses. Emissaries gain @BonusHealth@&nbsp;%i:scaleHealth% and @SelfishDamageAmp*100@%&nbsp;%i:scaleDA%</row><br><br><TFTGuildActive enabled=TFT13_Trait_Ambassador_ActiveDomina alternate=TFTGuildInactive>Ambessa: Allies gain @AmbessaArmor@ Armor and Magic Resist for each opponent defeated. (@TFTUnitProperty.trait:TFT13_Ambassador_PlayersDefeated@/7)</TFTGuildActive><br><br><TFTGuildActive enabled=TFT13_Trait_Ambassador_ActiveJarvan alternate=TFTGuildInactive>Garen: On Combat Start, Garen and allies to his left and right gain @GarenHealthPercent*100@% of his max Health.</TFTGuildActive><br><br><TFTGuildActive enabled=TFT13_Trait_Ambassador_ActiveNami alternate=TFTGuildInactive>Nami: Allies' attacks grant @NamiMana@ bonus Mana.</TFTGuildActive><br><br><TFTGuildActive enabled=TFT13_Trait_Ambassador_ActiveTristana alternate=TFTGuildInactive>Tristana: Allies gain @StarAS*100@% Attack Speed per star level.</TFTGuildActive>",
      "effects": [
          {
              "maxUnits": 1,
              "minUnits": 1,
              "style": 1,
              "variables": {
                  "AmbessaArmor": 2,
                  "AmbessaArmor_PVE": 4,
                  "BonusAS": null,
                  "BonusHealth": 200,
                  "CCImmuneDuration": 8,
                  "GarenHealthPercent": 0.20000000298023224,
                  "NamiMana": 2,
                  "SelfishDamageAmp": 0.20000000298023224,
                  "StarAS": 0.05999999865889549,
                  "{3854f478}": 2,
                  "{4b20f990}": null,
                  "{845be53a}": 4
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "AmbessaArmor": 2,
                  "AmbessaArmor_PVE": 4,
                  "BonusAS": null,
                  "BonusHealth": 200,
                  "CCImmuneDuration": 8,
                  "GarenHealthPercent": 0.20000000298023224,
                  "NamiMana": 2,
                  "SelfishDamageAmp": 0.20000000298023224,
                  "StarAS": 0.05999999865889549,
                  "{3854f478}": 2,
                  "{4b20f990}": null,
                  "{845be53a}": 4
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Diplomat.TFT_Set13.tex",
      "name": "Emissary"
  },
  {
      "apiName": "TFT13_Teamup_Mentorship",
      "desc": "When Ambessa casts, Caitlyn fires an empowered attack at the target, dealing @CaitAD*100@% damage. Ambessa gains @ADShare*100@% of Caitlyn's Attack Damage.",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "ADShare": 0.25,
                  "CaitAD": 2.25
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_Mentorship.TFT_Set13.tex",
      "name": "Martial Law"
  },
  {
      "apiName": "TFT13_Titan",
      "desc": "Your team gains Armor and Magic Resist. Sentinels gain triple.<br><br><expandRow>(@MinUnits@) @BonusArmor@&nbsp;%i:scaleArmor%%i:scaleMR%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "BonusArmor": 12,
                  "{5921fc26}": 2
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "BonusArmor": 25,
                  "{5921fc26}": 2
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BonusArmor": 42,
                  "{5921fc26}": 2
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_10_Warden.tex",
      "name": "Sentinel"
  },
  {
      "apiName": "TFT13_Teamup_Reunion",
      "desc": "When Vi casts, Ekko releases 3 afterimages towards her target each dealing @EkkoAfterImageReducedDamage*100@% damage. When Ekko casts, Vi slams an earthquake towards his target dealing @ViEarthquakeReducedDamage*100@% damage.",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "EkkoAfterImageReducedDamage": 0.5,
                  "ViEarthquakeReducedDamage": 1.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_Reunion.TFT_Set13.tex",
      "name": "Reunion"
  },
  {
      "apiName": "TFT13_Family",
      "desc": "Family members support each other, reducing their max Mana and gaining extra bonuses.<br><br><row>(@MinUnits@) @ManaReduction*100@% reduction, @DamageReduction*100@%&nbsp;%i:scaleDR%</row><br><row>(@MinUnits@) @ManaReduction*100@% reduction, @AttackSpeed*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @ManaReduction*100@% reduction, heist on topside! After combat, progress the heist, increased for each surviving Family&nbsp;member!</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 5,
              "variables": {
                  "AttackSpeed": 0.20000000298023224,
                  "DamageReduction": 0.15000000596046448,
                  "ManaReduction": 0.25
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "AttackSpeed": 0.20000000298023224,
                  "DamageReduction": 0.15000000596046448,
                  "ManaReduction": 0.30000001192092896
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "AttackSpeed": 0.20000000298023224,
                  "DamageReduction": 0.15000000596046448,
                  "ManaReduction": 0.4000000059604645,
                  "{01fcc30b}": 0.75,
                  "{217874f1}": 2.5,
                  "{43cb93dd}": 1.25,
                  "{46c3fc24}": 1.5,
                  "{6fc9f267}": 17,
                  "{8173be81}": 2,
                  "{9000fe5b}": 2,
                  "{92029cea}": 0.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Family.TFT_Set13.tex",
      "name": "Family"
  },
  {
      "apiName": "TFT13_Ambusher",
      "desc": "Damage from Ambushers' Abilities can critically strike. They also gain bonus Critical Strike Chance and Critical Strike Damage.<br><br><row>(@MinUnits@) @CritChance*100@%&nbsp;%i:scaleCrit%, @CritDamage*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CritChance*100@%&nbsp;%i:scaleCrit%, @CritDamage*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CritChance*100@%&nbsp;%i:scaleCrit%, @CritDamage*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CritChance*100@%&nbsp;%i:scaleCrit%, @CritDamage*100@%&nbsp;%i:scaleCritMult%; also gain @DamageReductionPct*100@% Durability</row>",
      "effects": [
          {
              "maxUnits": 2,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "CritChance": 0.20000000298023224,
                  "CritDamage": 0.10000000149011612
              }
          },
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 3,
              "variables": {
                  "CritChance": 0.30000001192092896,
                  "CritDamage": 0.20000000298023224
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "CritChance": 0.4000000059604645,
                  "CritDamage": 0.30000001192092896
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "CritChance": 0.550000011920929,
                  "CritDamage": 0.3499999940395355,
                  "DamageReductionPct": 0.15000000596046448
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Ambusher.TFT_Set13.tex",
      "name": "Ambusher"
  },
  {
      "apiName": "TFT13_Teamup_Sisters",
      "desc": "When Jinx scores a takedown, Vi gains @ADBuff*100@% bonus Attack Damage for @ViDuration@ seconds. When Vi scores a takedown, Jinx gains @ASBuff*100@% bonus Attack Speed for @JinxDuration@ seconds.",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "ADBuff": 0.4000000059604645,
                  "ASBuff": 0.75,
                  "JinxDuration": 5,
                  "ViDuration": 7
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_Sisters.TFT_Set13.tex",
      "name": "Sisters"
  },
  {
      "apiName": "TFT13_Invoker",
      "desc": "Whenever Visionaries gain Mana, they gain more.<br><br><row>(@MinUnits@) @EnlightenedBonusMana*100@% %i:scaleMana%</row><br><row>(@MinUnits@) @EnlightenedBonusMana*100@%&nbsp;%i:scaleMana%</row><br><row>(@MinUnits@) @EnlightenedBonusMana*100@%&nbsp;%i:scaleMana%</row><br><row>(@MinUnits@) @EnlightenedBonusMana*100@%&nbsp;%i:scaleMana%, Abilities heal an ally for @AllyHealing*100@% of damage dealt</row><br>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "EnlightenedBonusMana": 0.25
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "EnlightenedBonusMana": 0.5
              }
          },
          {
              "maxUnits": 7,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "EnlightenedBonusMana": 0.800000011920929
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 8,
              "style": 5,
              "variables": {
                  "AllyHealing": 0.20000000298023224,
                  "EnlightenedBonusMana": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Visionary.TFT_Set13.tex",
      "name": "Visionary"
  },
  {
      "apiName": "TFT13_Sniper",
      "desc": "Snipers deal more damage to targets farther away.<br><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;damage per hex</row><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;damage per hex</row><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;damage per hex and +@BonusHexRangeIncrease@ Attack Range</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "BonusHexRangeIncrease": null,
                  "PercentDamageIncrease": 7
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "BonusHexRangeIncrease": null,
                  "PercentDamageIncrease": 16
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BonusHexRangeIncrease": 5,
                  "PercentDamageIncrease": 35
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_6_Sniper.tex",
      "name": "Sniper"
  },
  {
      "apiName": "TFT13_Warband",
      "desc": "Conquerors' takedowns grant stacks of Conquest. After gaining enough Conquest, open War Chests full of loot!<br><br>Conquerors gain Attack Damage and Ability Power, increased by @PercentIncreasePerChest*100@% for each War Chest opened.<br><br><expandRow>(@MinUnits@) @ADAPBase*100@%&nbsp;%i:scaleAD%%i:scaleAP%; @StacksPerKill@x&nbsp;Conquest</expandRow><br><br><rules>War Chests Opened: @TFTUnitProperty.trait:TFT13_Warband_ChestsCompleted@</rules><br><rules>Current Stats: @TFTUnitProperty.trait:TFT13_Warband_CurrentADAP@%&nbsp;%i:scaleAD%%i:scaleAP%</rules><br>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "ADAPBase": 0.1599999964237213,
                  "PercentIncreasePerChest": 0.029999999329447746,
                  "StacksPerKill": 1
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "ADAPBase": 0.25,
                  "PercentIncreasePerChest": 0.029999999329447746,
                  "StacksPerKill": 3
              }
          },
          {
              "maxUnits": 8,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "ADAPBase": 0.4000000059604645,
                  "PercentIncreasePerChest": 0.029999999329447746,
                  "StacksPerKill": 6
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 9,
              "style": 6,
              "variables": {
                  "ADAPBase": 1,
                  "PercentIncreasePerChest": 0.029999999329447746,
                  "StacksPerKill": 20
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Conqueror.TFT_Set13.tex",
      "name": "Conqueror"
  },
  {
      "apiName": "TFT13_HighRoller",
      "desc": "When casting, Sevika rolls a random Jinx modification to her Ability and gains @Durability*100@% Durability for @Duration@ seconds.<br><br>Mods:<br>-Rocket: Launch @Bonus1NumRockets@ rockets that deal @Bonus1RocketDamage@ physical damage each<br>-Shield: Gain @Bonus2ShieldAmount@ Shield for @Bonus2ShieldDuration@ seconds<br>-Coin: Gain @Bonus4Gold@ gold<br>-Triple: Enhance her rolled ability!",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 1,
              "style": 4,
              "variables": {
                  "Bonus1NumRockets": 8,
                  "Bonus1RocketDamage": 100,
                  "Bonus2ShieldAmount": 500,
                  "Bonus2ShieldDuration": 4,
                  "Bonus4Gold": 3,
                  "Durability": 0.800000011920929,
                  "Duration": 1.5,
                  "{01148678}": 0.3499999940395355,
                  "{267deafa}": 0.3499999940395355,
                  "{52aec87f}": 0.10000000149011612,
                  "{592d23e5}": 0.3499999940395355,
                  "{699f6a87}": 0.20000000298023224,
                  "{9ad9e572}": 0.004999999888241291,
                  "{9b22c5ec}": null,
                  "{bcedb441}": 1.5,
                  "{e1fc0fa1}": 0.24500000476837158,
                  "{e640e05f}": 0.4000000059604645
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_HighRoller.TFT_Set13.tex",
      "name": "High Roller"
  },
  {
      "apiName": "TFT13_Academy",
      "desc": "The Academy sponsors 3 items each game.<br><br>Copies of sponsored items grant bonus max Health and Damage Amp. Academy units holding sponsored items gain double the amount, plus an additional @BaseValues*100@% Health and Damage Amp.<br><br><row>(@MinUnits@) @PercentIncreaseSponsored*100@% %i:scaleHealth% %i:scaleDA%;<br>gain 1 sponsored item.</row><br><row>(@MinUnits@) @PercentIncreaseSponsored*100@% %i:scaleHealth% %i:scaleDA%;<br>gain 1 sponsored item.</row><br><row>(@MinUnits@) @PercentIncreaseSponsored*100@% %i:scaleHealth% %i:scaleDA%;<br>gain 1 sponsored item.</row><br><row>(@MinUnits@) @PercentIncreaseSponsored*100@% %i:scaleHealth% %i:scaleDA%</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 1,
              "variables": {
                  "BaseValues": 0.05000000074505806,
                  "NumOfItems": 1,
                  "PercentIncreaseSponsored": 0.019999999552965164
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "BaseValues": 0.05000000074505806,
                  "NumOfItems": 2,
                  "PercentIncreaseSponsored": 0.029999999329447746
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "BaseValues": 0.05000000074505806,
                  "NumOfItems": 3,
                  "PercentIncreaseSponsored": 0.03999999910593033
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BaseValues": 0.05000000074505806,
                  "NumOfItems": 3,
                  "PercentIncreaseSponsored": 0.07999999821186066
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Academy.TFT_Set13.tex",
      "name": "Academy"
  },
  {
      "apiName": "TFT13_Crime",
      "desc": "Gain Shimmer after each player combat. If your loss streak is at least @MinStreakLength@, gain more.<br><br>At each stack of @ShimmerBreakpoint@ Shimmer, the Black Market offers you contraband that only Chem-Barons can use. Chem-Barons gain max Health for each Black Market you pass on.<br><br><expandRow>(@MinUnits@) @ShimmerPerCombat@ or @ShimmerPerCombatStreaking@; @HealthPerSkip@&nbsp;%i:scaleHealth%</expandRow><br><br><rules>Markets Skipped: @TFTUnitProperty.trait:TFT13_Crime_PassedMarkets@</rules><br><rules>Current Health: @TFTUnitProperty.trait:TFT13_Crime_CurrentHealth@&nbsp;%i:scaleHealth%</rules>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 1,
              "variables": {
                  "HealthPerSkip": 20,
                  "MinStreakLength": 3,
                  "ShimmerBreakpoint": 100,
                  "ShimmerPerCombat": 15,
                  "ShimmerPerCombatStreaking": 30,
                  "ShimmerPerCombatStreaking_HR": 50,
                  "ShimmerPerCombat_HR": 25,
                  "ShimmerPerDeath_PVE": 1,
                  "ShimmerPerRound_PVE": 15,
                  "{ecbc38fd}": 1
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "HealthPerSkip": 50,
                  "MinStreakLength": 3,
                  "ShimmerBreakpoint": 100,
                  "ShimmerPerCombat": 20,
                  "ShimmerPerCombatStreaking": 40,
                  "ShimmerPerCombatStreaking_HR": 60,
                  "ShimmerPerCombat_HR": 30,
                  "ShimmerPerDeath_PVE": 1,
                  "ShimmerPerRound_PVE": 20,
                  "{ecbc38fd}": 1
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "HealthPerSkip": 90,
                  "MinStreakLength": 3,
                  "ShimmerBreakpoint": 100,
                  "ShimmerPerCombat": 20,
                  "ShimmerPerCombatStreaking": 50,
                  "ShimmerPerCombatStreaking_HR": 70,
                  "ShimmerPerCombat_HR": 35,
                  "ShimmerPerDeath_PVE": 2,
                  "ShimmerPerRound_PVE": 30,
                  "{ecbc38fd}": 1
              }
          },
          {
              "maxUnits": 6,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "HealthPerSkip": 125,
                  "MinStreakLength": 3,
                  "ShimmerBreakpoint": 100,
                  "ShimmerPerCombat": 25,
                  "ShimmerPerCombatStreaking": 70,
                  "ShimmerPerCombatStreaking_HR": 90,
                  "ShimmerPerCombat_HR": 45,
                  "ShimmerPerDeath_PVE": 3,
                  "ShimmerPerRound_PVE": 40,
                  "{ecbc38fd}": 1
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 7,
              "style": 5,
              "variables": {
                  "HealthPerSkip": 180,
                  "MinStreakLength": 3,
                  "ShimmerBreakpoint": 100,
                  "ShimmerPerCombat": 30,
                  "ShimmerPerCombatStreaking": 100,
                  "ShimmerPerCombatStreaking_HR": 125,
                  "ShimmerPerCombat_HR": 60,
                  "ShimmerPerDeath_PVE": 15,
                  "ShimmerPerRound_PVE": 65,
                  "{ecbc38fd}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Crime.TFT_Set13.tex",
      "name": "Chem-Baron"
  },
  {
      "apiName": "TFT13_Rebel",
      "desc": "Rebels gain @MaxHealthIncrease*100@% max Health.<br><br>After your team loses @PercentHealthTrigger*100@% of their Health, a smoke signal appears, granting Rebels @BurstAS*100@% Attack Speed for @BurstDuration@ seconds and extra power for the rest of&nbsp;combat.<br><br><row>(@MinUnits@) @ADAP*100@%&nbsp;%i:scaleAD%%i:scaleAP%</row><br><row>(@MinUnits@) @ADAP*100@%&nbsp;%i:scaleAD%%i:scaleAP%, @PercentMaxHealthBonus*100@%&nbsp;%i:scaleHealth%</row><br><row>(@MinUnits@) @ADAP*100@%&nbsp;%i:scaleAD%%i:scaleAP%, @PercentMaxHealthBonus*100@%&nbsp;%i:scaleHealth%, and Stun all enemies for @StunDuration@&nbsp;seconds</row><br><row>(@MinUnits@) The smoke signal triggers at Combat Start and every @ForceDuration@&nbsp;seconds.</row>",
      "effects": [
          {
              "maxUnits": 4,
              "minUnits": 3,
              "style": 1,
              "variables": {
                  "ADAP": 0.20000000298023224,
                  "BurstAS": 0.6000000238418579,
                  "BurstDuration": 4,
                  "ForceDuration": null,
                  "MaxHealthIncrease": 0.11999999731779099,
                  "PercentHealthTrigger": 0.30000001192092896,
                  "PercentMaxHealthBonus": null,
                  "StunDuration": null,
                  "{1ec59053}": null
              }
          },
          {
              "maxUnits": 6,
              "minUnits": 5,
              "style": 3,
              "variables": {
                  "ADAP": 0.4000000059604645,
                  "BurstAS": 0.6000000238418579,
                  "BurstDuration": 4,
                  "ForceDuration": null,
                  "MaxHealthIncrease": 0.11999999731779099,
                  "PercentHealthTrigger": 0.30000001192092896,
                  "PercentMaxHealthBonus": 0.11999999731779099,
                  "StunDuration": null,
                  "{1ec59053}": null
              }
          },
          {
              "maxUnits": 9,
              "minUnits": 7,
              "style": 5,
              "variables": {
                  "ADAP": 0.44999998807907104,
                  "BurstAS": 0.6000000238418579,
                  "BurstDuration": 4,
                  "ForceDuration": null,
                  "MaxHealthIncrease": 0.11999999731779099,
                  "PercentHealthTrigger": 0.30000001192092896,
                  "PercentMaxHealthBonus": 0.15000000596046448,
                  "StunDuration": 2,
                  "{1ec59053}": null
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 10,
              "style": 6,
              "variables": {
                  "ADAP": 0.5,
                  "BurstAS": 0.6000000238418579,
                  "BurstDuration": 4,
                  "ForceDuration": 8,
                  "MaxHealthIncrease": 0.11999999731779099,
                  "PercentHealthTrigger": 0.30000001192092896,
                  "PercentMaxHealthBonus": 0.30000001192092896,
                  "StunDuration": 2,
                  "{1ec59053}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Rebel.TFT_Set13.tex",
      "name": "Rebel"
  },
  {
      "apiName": "TFT13_Infused",
      "desc": "Combat start: Dominators gain a Shield for @ShieldDuration@ seconds.<br><br>When Dominators cast, they gain stacking Ability Power based on the Mana spent.<br><br><expandRow>(@MinUnits@) @ShieldAmount@ Shield, @APPercent*100@%&nbsp;%i:scaleAP%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "APPercent": 0.25,
                  "ShieldAmount": 350,
                  "ShieldDuration": 15
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "APPercent": 0.44999998807907104,
                  "ShieldAmount": 500,
                  "ShieldDuration": 15
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "APPercent": 0.6499999761581421,
                  "ShieldAmount": 700,
                  "ShieldDuration": 15
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Dominator.TFT_Set13.tex",
      "name": "Dominator"
  },
  {
      "apiName": "TFT13_Pugilist",
      "desc": "Pit Fighters gain @OmnivampPercent*100@% Omnivamp and deal bonus true damage. Once per combat at @HealthThreshold*100@% Health, they heal a percentage of their max Health over @Duration@ seconds.<br><br><expandRow>(@MinUnits@) @TrueDamagePercent*100@%&nbsp;true damage, @HealPercent*100@%&nbsp;%i:scaleHealth%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "Duration": 2,
                  "HealPercent": 0.10000000149011612,
                  "HealthThreshold": 0.5,
                  "OmnivampPercent": 0.15000000596046448,
                  "TrueDamagePercent": 0.05999999865889549
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "Duration": 2,
                  "HealPercent": 0.25,
                  "HealthThreshold": 0.5,
                  "OmnivampPercent": 0.15000000596046448,
                  "TrueDamagePercent": 0.11999999731779099
              }
          },
          {
              "maxUnits": 7,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "Duration": 2,
                  "HealPercent": 0.4000000059604645,
                  "HealthThreshold": 0.5,
                  "OmnivampPercent": 0.15000000596046448,
                  "TrueDamagePercent": 0.20000000298023224
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 8,
              "style": 5,
              "variables": {
                  "Duration": 2,
                  "HealPercent": 0.9900000095367432,
                  "HealthThreshold": 0.5,
                  "OmnivampPercent": 0.15000000596046448,
                  "TrueDamagePercent": 0.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_PitFighter.TFT_Set13.tex",
      "name": "Pit Fighter"
  },
  {
      "apiName": "TFT13_Teamup_BloodBrothers",
      "desc": "Vander gains @TFTTrait.TFT13_Teamup_BloodBrothers.1:MaxHealthGainPerCast@ permanent max Health for each time Silco casts. Silco gains @TFTTrait.TFT13_Teamup_BloodBrothers.1:APGainPerDeath@ permanent Ability Power for each time Vander dies.<br><br>Bonuses: @TFTUnitProperty.trait:TFT13_Sidekick_BloodBrothers_HealthGained@ %i:scaleHealth% | @TFTUnitProperty.trait:TFT13_Sidekick_BloodBrothers_APGained@ %i:scaleAP%",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "APGainPerDeath": 6,
                  "MaxHealthGainPerCast": 30
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_BloodBrothers.TFT_Set13.tex",
      "name": "What Could Have Been"
  },
  {
      "apiName": "TFT13_Squad",
      "desc": "Combat Start: Enforcers gain Shield and Damage Amp. The highest Health enemy units become <i>WANTED!</i> <br><br>When a Wanted enemy dies, Enforcers gain @AttackSpeedPerWantedKill*100@% Attack Speed.<br><br><row>(@MinUnits@) @NumOfWantedEnemies@&nbsp;units; @PercentMaxHealthShield*100*100@%&nbsp;%i:scaleHealth%,&nbsp;@BaseDA*100@%&nbsp;%i:scaleDA%</row><br><row>(@MinUnits@) @NumOfWantedEnemies@&nbsp;units; @PercentMaxHealthShield*100*100@%&nbsp;%i:scaleHealth%,&nbsp;@BaseDA*100@%&nbsp;%i:scaleDA%</row><br><row>(@MinUnits@) @NumOfWantedEnemies@&nbsp;units; @PercentMaxHealthShield*100*100@%&nbsp;%i:scaleHealth%,&nbsp;@BaseDA*100@%&nbsp;%i:scaleDA%</row><br><row>(@MinUnits@) @NumOfWantedEnemies@&nbsp;units; @PercentMaxHealthShield*100*100@%&nbsp;%i:scaleHealth%,&nbsp;@BaseDA*100@%&nbsp;%i:scaleDA%</row><br><row>(@MinUnits@) ALL enemies; @PercentMaxHealthShield*100*100@%&nbsp;%i:scaleHealth%, @BaseDA*100@%&nbsp;%i:scaleDA%; Combat Start: Confiscate all enemy&nbsp;items!</row>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "AttackSpeedPerWantedKill": 0.30000001192092896,
                  "BaseDA": 0.11999999731779099,
                  "NumOfWantedEnemies": 1,
                  "PercentMaxHealthShield": 0.11999999731779099,
                  "{36b1550f}": null,
                  "{9edd4912}": null
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "AttackSpeedPerWantedKill": 0.30000001192092896,
                  "BaseDA": 0.20000000298023224,
                  "NumOfWantedEnemies": 2,
                  "PercentMaxHealthShield": 0.20000000298023224,
                  "{36b1550f}": null,
                  "{9edd4912}": null
              }
          },
          {
              "maxUnits": 7,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "AttackSpeedPerWantedKill": 0.30000001192092896,
                  "BaseDA": 0.33000001311302185,
                  "NumOfWantedEnemies": 4,
                  "PercentMaxHealthShield": 0.30000001192092896,
                  "{36b1550f}": null,
                  "{9edd4912}": null
              }
          },
          {
              "maxUnits": 9,
              "minUnits": 8,
              "style": 5,
              "variables": {
                  "AttackSpeedPerWantedKill": 0.30000001192092896,
                  "BaseDA": 0.5,
                  "NumOfWantedEnemies": 5,
                  "PercentMaxHealthShield": 0.4000000059604645,
                  "{36b1550f}": null,
                  "{9edd4912}": null
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 10,
              "style": 6,
              "variables": {
                  "AttackSpeedPerWantedKill": 0.30000001192092896,
                  "BaseDA": 1.5,
                  "NumOfWantedEnemies": 99,
                  "PercentMaxHealthShield": 1,
                  "{36b1550f}": null,
                  "{9edd4912}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Squad.TFT_Set13.tex",
      "name": "Enforcer"
  },
  {
      "apiName": "TFT13_Hoverboard",
      "desc": "Every @Duration@ seconds, Firelights dash. While dashing, they attack with infinite range and heal a percentage of the damage taken since their last dash.<br><br><row>(@MinUnits@) @PercentDamageTakenHeal*100@% of damage taken</row><br><row>(@MinUnits@) @PercentDamageTakenHeal*100@% of damage taken</row><br><row>(@MinUnits@) @PercentDamageTakenHeal*100@% of damage taken. While dashing, gain a massive burst of Attack Speed.</row>",
      "effects": [
          {
              "maxUnits": 2,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "Duration": 6,
                  "PercentDamageTakenHeal": 0.25,
                  "{0a9a9714}": null,
                  "{3c0d594a}": 1
              }
          },
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 5,
              "variables": {
                  "Duration": 6,
                  "PercentDamageTakenHeal": 0.4000000059604645,
                  "{0a9a9714}": null,
                  "{3c0d594a}": 1
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "Duration": 6,
                  "PercentDamageTakenHeal": 0.44999998807907104,
                  "{0a9a9714}": 3.5,
                  "{3c0d594a}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Hoverboard.TFT_Set13.tex",
      "name": "Firelight"
  },
  {
      "apiName": "TFT13_Teamup_UnlikelyDuo",
      "desc": "Jinx and Sevika gain @AD*100@% Attack Damage and @Health@ Health. Whenever one casts, they grant the other @Mana@ mana. Sevika's arm is luckier.",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "AD": 0.10000000149011612,
                  "Health": 100,
                  "Mana": 10,
                  "{1e90fa01}": 0.10000000149011612
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_UnlikelyDuo.TFT_Set13.tex",
      "name": "Unlikely Duo"
  },
  {
      "apiName": "TFT13_Experiment",
      "desc": "Gain Laboratory hexes on your board.<br><br>Combat start: Experiments standing on Laboratory hexes gain the Experiment bonuses of all Experiments on Laboratory hexes, plus max Health.<br><br><row>(@MinUnits@) @NumLaboratory@ Laboratories, @MaxHealth@&nbsp;%i:scaleHealth%</row><br><row>(@MinUnits@) @NumLaboratory@ Laboratories, @MaxHealth@&nbsp;%i:scaleHealth%</row><br><row>(@MinUnits@) Experiment bonuses increase by @ExperimentBonusIncrease*100@%!</row>",
      "effects": [
          {
              "maxUnits": 4,
              "minUnits": 3,
              "style": 1,
              "variables": {
                  "ExperimentBonusIncrease": null,
                  "MaxHealth": 100,
                  "NumLaboratory": 2,
                  "{a02e81c2}": 1.149999976158142
              }
          },
          {
              "maxUnits": 6,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "ExperimentBonusIncrease": null,
                  "MaxHealth": 300,
                  "NumLaboratory": 3,
                  "{a02e81c2}": 1.2999999523162842
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 7,
              "style": 5,
              "variables": {
                  "ExperimentBonusIncrease": 1,
                  "MaxHealth": 200,
                  "NumLaboratory": 3,
                  "{a02e81c2}": 1.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Experiment.TFT_Set13.tex",
      "name": "Experiment"
  },
  {
      "apiName": "TFT13_Bruiser",
      "desc": "Your team gains @TeamFlatHealth@ max Health. Bruisers gain more.<br><br><expandRow>(@MinUnits@) @BonusPercentHealth*100@%&nbsp;%i:scaleHealth%</expandRow>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "BonusPercentHealth": 0.20000000298023224,
                  "TeamFlatHealth": 100
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "BonusPercentHealth": 0.44999998807907104,
                  "TeamFlatHealth": 100
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BonusPercentHealth": 0.800000011920929,
                  "TeamFlatHealth": 100
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_6_Bruiser.tex",
      "name": "Bruiser"
  },
  {
      "apiName": "TFT13_JunkerKing",
      "desc": "Every @NumRounds1Star@ rounds, open an armory to purchase permanent upgrades to your strongest Rumble's&nbsp;mech.<br><br><rules>Rounds Until Upgrade: @TFTUnitProperty.trait:TFT13_JunkerKing_RoundsUntilOpening@</rules>",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 1,
              "style": 4,
              "variables": {
                  "NumRounds1Star": 3,
                  "NumRounds1Star_HR": 2,
                  "{7b91cfd3}": 2,
                  "{da177dfb}": 1,
                  "{ea33712c}": 3,
                  "{ed4fa85a}": 1
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_JunkerKing.TFT_Set13.tex",
      "name": "Junker King"
  },
  {
      "apiName": "TFT13_Cabal",
      "desc": "<row>(@MinUnits@) Summon a chained Sion. He is freed after @NumCastsToUnlock@ casts from Black Rose units or when he drops below @PercentHealthUnlock*100@% health.</row><br><row>(@MinUnits@) Sion grows stronger and his enemies take more damage from Black Rose units.</row><br><row>(@MinUnits@) Sion unleashes dark magic and heals to full Health when freed.</row><br><row>(@MinUnits@) When Sion dies, he restores to life with power beyond death!</row><br><br><rules>Each Black Rose champion's star level increases Sion's power</rules>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 1,
              "variables": {
                  "NumCastsToUnlock": 5,
                  "PercentHealthPerStarLevel": 0.15000000596046448,
                  "PercentHealthUnlock": 0.6499999761581421,
                  "{2c6be05c}": 0.11999999731779099,
                  "{2e45fc86}": 40,
                  "{85b293ec}": 0.3499999940395355,
                  "{92ef9cd7}": 4
              }
          },
          {
              "maxUnits": 4,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "NumCastsToUnlock": 5,
                  "PercentHealthPerStarLevel": 0.15000000596046448,
                  "PercentHealthUnlock": 0.6499999761581421,
                  "{2c6be05c}": 0.11999999731779099,
                  "{2e45fc86}": 60,
                  "{85b293ec}": 0.3499999940395355,
                  "{92ef9cd7}": 4
              }
          },
          {
              "maxUnits": 6,
              "minUnits": 5,
              "style": 5,
              "variables": {
                  "NumCastsToUnlock": 5,
                  "PercentHealthPerStarLevel": 0.15000000596046448,
                  "PercentHealthUnlock": 0.6499999761581421,
                  "{2c6be05c}": 0.11999999731779099,
                  "{2e45fc86}": 90,
                  "{85b293ec}": 0.3499999940395355,
                  "{92ef9cd7}": 4
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 7,
              "style": 5,
              "variables": {
                  "NumCastsToUnlock": 5,
                  "PercentHealthPerStarLevel": 0.15000000596046448,
                  "PercentHealthUnlock": 0.6499999761581421,
                  "{2c6be05c}": 0.11999999731779099,
                  "{2e45fc86}": 120,
                  "{85b293ec}": 0.3499999940395355,
                  "{92ef9cd7}": 4
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Cabal.TFT_Set13.tex",
      "name": "Black Rose"
  },
  {
      "apiName": "TFT13_Challenger",
      "desc": "Quickstrikers move faster and gain Attack Speed, based on their target's missing Health.<br><br><row>(@MinUnits@) @MinBonusAS*100@-@MaxBonusAS*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @MinBonusAS*100@-@MaxBonusAS*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @MinBonusAS*100@-@MaxBonusAS*100@%&nbsp;%i:scaleAS%. On target death, Quickstrikers dash to a new target and gain @ShieldAmount@ shield for @ShieldDuration@&nbsp;seconds. </row>",
      "effects": [
          {
              "maxUnits": 2,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "MaxBonusAS": 0.6000000238418579,
                  "MinBonusAS": 0.20000000298023224,
                  "{0e9453af}": null,
                  "{bdb9953b}": 200
              }
          },
          {
              "maxUnits": 3,
              "minUnits": 3,
              "style": 3,
              "variables": {
                  "MaxBonusAS": 0.800000011920929,
                  "MinBonusAS": 0.30000001192092896,
                  "{0e9453af}": null,
                  "{bdb9953b}": 200
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 4,
              "style": 5,
              "variables": {
                  "MaxBonusAS": 1,
                  "MinBonusAS": 0.4000000059604645,
                  "ShieldAmount": 200,
                  "ShieldDuration": 3,
                  "{0e9453af}": null,
                  "{bdb9953b}": 200
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Quickstriker.TFT_Set13.tex",
      "name": "Quickstriker"
  },
  {
      "apiName": "TFT13_Teamup_Geniuses",
      "desc": "When Heimerdinger casts, Ekko releases @NumEkkoAfterImages@ afterimages, each dealing @ReducedEkkoDamage*100@% damage. When Ekko casts, Heimerdinger fires @NumHeimerMissiles@ missiles, each dealing @ReducedHeimerDamage*100@% damage. ",
      "effects": [
          {
              "maxUnits": 25000,
              "minUnits": 2,
              "style": 4,
              "variables": {
                  "NumEkkoAfterImages": 3,
                  "NumHeimerMissiles": 3,
                  "ReducedEkkoDamage": 0.33000001311302185,
                  "ReducedHeimerDamage": 1.0499999523162842
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/TeamUp_Trait_Geniuses.TFT_Set13.tex",
      "name": "Geniuses"
  },
  {
      "apiName": "TFT13_Watcher",
      "desc": "Watchers gain Durability, increased while above @HealthBreakpoint*100@%&nbsp;Health.<br><br><expandRow>(@MinUnits@) @BaseDR*100@% or @IncreasedDR*100@%&nbsp;%i:scaleDR%</expandRow><br>",
      "effects": [
          {
              "maxUnits": 3,
              "minUnits": 2,
              "style": 1,
              "variables": {
                  "BaseDR": 0.15000000596046448,
                  "HealthBreakpoint": 0.5,
                  "IncreasedDR": 0.30000001192092896
              }
          },
          {
              "maxUnits": 5,
              "minUnits": 4,
              "style": 3,
              "variables": {
                  "BaseDR": 0.25,
                  "HealthBreakpoint": 0.5,
                  "IncreasedDR": 0.44999998807907104
              }
          },
          {
              "maxUnits": 25000,
              "minUnits": 6,
              "style": 5,
              "variables": {
                  "BaseDR": 0.3499999940395355,
                  "HealthBreakpoint": 0.5,
                  "IncreasedDR": 0.5
              }
          }
      ],
      "icon": "ASSETS/UX/TraitIcons/Trait_Icon_13_Watcher.TFT_Set13.tex",
      "name": "Watcher"
  }
]

export default sinergiasData;