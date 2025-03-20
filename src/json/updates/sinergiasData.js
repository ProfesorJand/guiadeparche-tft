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
  },
  {
    "apiName": "TFT14_Divinicorp",
    "desc": "Divinicorp champions grant unique stats to your team, increased for each Divinicorp in play. <br><br>Divinicorp champions gain double.<br><br><expandRow>(@MinUnits@) <TFTGuildActive>@DivinicorpBonus*100@%</TFTGuildActive>&nbsp;bonus.</expandRow><br><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveAP alternate=TFTGuildInactive>Morgana - </TFTGuildActive>&nbsp;%i:scaleAP% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveAP alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_AP@%</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveDefenses alternate=TFTGuildInactive>Rhaast - </TFTGuildActive>&nbsp;%i:scaleArmor%&nbsp;%i:scaleMR% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveDefenses alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_Defenses@</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveAttackDamage alternate=TFTGuildInactive>Senna - </TFTGuildActive>&nbsp;%i:scaleAD% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveAttackDamage alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_AD@%</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveHealth alternate=TFTGuildInactive>Gragas - </TFTGuildActive>&nbsp;%i:scaleHealth% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveHealth alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_Health@</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveCrit alternate=TFTGuildInactive>Vex - &nbsp;%i:scaleCrit% </TFTGuildActive><spellActive enabled=TFT14_Trait_Divinicorp_ActiveCrit alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_Crit@%</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveAttackSpeed alternate=TFTGuildInactive>Renekton - </TFTGuildActive>&nbsp;%i:scaleAS% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveAttackSpeed alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_AS@%</spellActive><br><TFTGuildActive enabled=TFT14_Trait_Divinicorp_ActiveOmnivamp alternate=TFTGuildInactive>Emblem - </TFTGuildActive>&nbsp;%i:scaleSV% <spellActive enabled=TFT14_Trait_Divinicorp_ActiveOmnivamp alternate=TFTGuildInactive>@TFTUnitProperty.trait:TFT14_Trait_Divinicorp_Omnivamp@%</spellActive>",
    "effects": [
        {
            "maxUnits": 1,
            "minUnits": 1,
            "style": 1,
            "variables": {
                "{10948251}": 1.0,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 3,
            "variables": {
                "{10948251}": 1.100000023841858,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "{10948251}": 1.25,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 4,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "{10948251}": 1.4500000476837158,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 5,
            "style": 5,
            "variables": {
                "{10948251}": 1.649999976158142,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 6,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "{10948251}": 1.850000023841858,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 7,
            "style": 5,
            "variables": {
                "{10948251}": 2.0,
                "{19e47528}": 9.0,
                "{3c9e3624}": 3.0,
                "{414a2beb}": 7.0,
                "{4803a4eb}": 5.0,
                "{4e1c6b85}": 1.0,
                "{912546f4}": 8.0,
                "{a8a84fe9}": 50.0,
                "{f82ecbac}": 6.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Divinicorp.TFT_Set14.tex",
    "name": "Divinicorp"
},
{
    "apiName": "TFT14_StreetDemon",
    "desc": "Allies in painted hexes gain Health, Ability Power, and Attack Damage. Some hexes are Signature hexes and grant @EmpoweredHexPercentBonus*100@% more. <br><br>Street Demons double all bonuses.<br><br><row>(@MinUnits@) +@HP*100@%&nbsp;%i:scaleHealth%, @ADAP@&nbsp;%i:scaleAP%, @ADAP@%&nbsp;%i:scaleAD%</row><br><row>(@MinUnits@) +@HP*100@%&nbsp;%i:scaleHealth%, @ADAP@&nbsp;%i:scaleAP%, @ADAP@%&nbsp;%i:scaleAD%</row><br><row>(@MinUnits@) +@HP*100@%&nbsp;%i:scaleHealth%, @ADAP@&nbsp;%i:scaleAP%, @ADAP@%&nbsp;%i:scaleAD%</row><br><row>(@MinUnits@) +@HP*100@%&nbsp;%i:scaleHealth%, @ADAP@&nbsp;%i:scaleAP%, @ADAP@%&nbsp;%i:scaleAD%<br>Paint the town!</row>",
    "effects": [
        {
            "maxUnits": 4,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "ADAP": 6.0,
                "HP": 0.05999999865889549,
                "{05fa71fc}": 2.0,
                "{179ecb0a}": 0.5,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 6,
            "minUnits": 5,
            "style": 3,
            "variables": {
                "ADAP": 10.0,
                "HP": 0.10000000149011612,
                "{05fa71fc}": 2.0,
                "{179ecb0a}": 0.5,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 9,
            "minUnits": 7,
            "style": 5,
            "variables": {
                "ADAP": 15.0,
                "HP": 0.15000000596046448,
                "{05fa71fc}": 2.0,
                "{179ecb0a}": 0.5,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 10,
            "style": 6,
            "variables": {
                "ADAP": 40.0,
                "HP": 0.4000000059604645,
                "{05fa71fc}": 2.0,
                "{179ecb0a}": 0.5,
                "{696854de}": 20.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_StreetDemon.TFT_Set14.tex",
    "name": "Street Demon"
},
{
    "apiName": "TFT14_Supercharge",
    "desc": "A.M.P. champions upgrade their abilities in unique ways with Amp (%i:set14AmpIcon%). They also gain&nbsp;Health.<br><br><expandRow>(@MinUnits@) @SuperchargeAmount@ %i:set14AmpIcon%, @HPAmt@ %i:scaleHealth%</expandRow>",
    "effects": [
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "HPAmt": 100.0,
                "{a2a0725c}": 1.0
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "HPAmt": 200.0,
                "{a2a0725c}": 2.0
            }
        },
        {
            "maxUnits": 4,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "HPAmt": 350.0,
                "{a2a0725c}": 3.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 5,
            "style": 5,
            "variables": {
                "HPAmt": 500.0,
                "{a2a0725c}": 4.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Amp.TFT_Set14.tex",
    "name": "A.M.P."
},
{
    "apiName": "TFT14_AnimaSquad",
    "desc": "At each tier, pick a weapon that a random Anima Squad champion fires periodically during combat. Anima Squad champions gain Armor, Magic Resist, and Damage Amp.<br><br><row>(@MinUnits@) @Resists@ %i:scaleArmor%%i:scaleMR%, @DamageAmp*100@% %i:scaleDA%,<br>@TFTUnitProperty.trait:TFT14_AnimaSquad_Bonus_1@</row><br><row>(@MinUnits@) @Resists@ %i:scaleArmor%%i:scaleMR%, @DamageAmp*100@% %i:scaleDA%,<br>@TFTUnitProperty.trait:TFT14_AnimaSquad_Bonus_2@</row><br><row>(@MinUnits@) @Resists@ %i:scaleArmor%%i:scaleMR%, @DamageAmp*100@% %i:scaleDA%,<br>@TFTUnitProperty.trait:TFT14_AnimaSquad_Bonus_3@</row><br><row>(@MinUnits@) @Resists@ %i:scaleArmor%%i:scaleMR%, @DamageAmp*100@% %i:scaleDA%,<br>@TFTUnitProperty.trait:TFT14_AnimaSquad_Bonus_4@</row><br><br><rules>Weapons scale with Anima Squad star level and stage.</rules>",
    "effects": [
        {
            "maxUnits": 4,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "DamageAmp": 0.05000000074505806,
                "Resists": 10.0,
                "{0d14760d}": 4.0,
                "{52b463c3}": 0.05000000074505806
            }
        },
        {
            "maxUnits": 6,
            "minUnits": 5,
            "style": 3,
            "variables": {
                "DamageAmp": 0.10000000149011612,
                "Resists": 20.0,
                "{0d14760d}": 4.0,
                "{52b463c3}": 0.05000000074505806
            }
        },
        {
            "maxUnits": 9,
            "minUnits": 7,
            "style": 5,
            "variables": {
                "DamageAmp": 0.15000000596046448,
                "Resists": 30.0,
                "{0d14760d}": 4.0,
                "{52b463c3}": 0.05000000074505806
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 10,
            "style": 6,
            "variables": {
                "DamageAmp": 0.5,
                "Resists": 100.0,
                "{0d14760d}": 4.0,
                "{52b463c3}": 0.05000000074505806
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_AnimaSquad.TFT_Set14.tex",
    "name": "Anima Squad"
},
{
    "apiName": "TFT14_Vanguard",
    "desc": "Vanguards gain @DamageReductionPct*100@% Durability while Shielded. <br><br>Combat start and @HealthThreshold*100@%&nbsp;Health: Gain a max Health Shield for @ShieldDuration@&nbsp;seconds.<br><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health</row><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health</row><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health;<br>@EnhancedDurability*100@%&nbsp;%i:scaleDR% while Shielded</row>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "DamageReductionPct": 0.10000000149011612,
                "HealthThreshold": 0.5,
                "ShieldDuration": 10.0,
                "ShieldPercentAmount": 0.1599999964237213,
                "{f8fac858}": 0.20000000298023224
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "DamageReductionPct": 0.10000000149011612,
                "HealthThreshold": 0.5,
                "ShieldDuration": 10.0,
                "ShieldPercentAmount": 0.3199999928474426,
                "{f8fac858}": 0.20000000298023224
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "DamageReductionPct": 0.10000000149011612,
                "HealthThreshold": 0.5,
                "ShieldDuration": 10.0,
                "ShieldPercentAmount": 0.4000000059604645,
                "{f8fac858}": 0.20000000298023224
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_12_Vanguard.TFT_Set12.tex",
    "name": "Vanguard"
},
{
    "apiName": "TFT14_Strong",
    "desc": "Slayers gain Attack Damage and Omnivamp. Overhealing heals the lowest percent Health Slayer for @OverhealPercent*100@% of the excess amount.<br><br><expandRow>(@MinUnits@) @AttackDamage*100@% %i:scaleAD%, @Healing*100@% %i:scaleSV%</expandRow>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "AttackDamage": 0.15000000596046448,
                "Healing": 0.15000000596046448,
                "{696854de}": 20.0,
                "{88ef08c2}": 0.5
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "AttackDamage": 0.4000000059604645,
                "Healing": 0.15000000596046448,
                "{88ef08c2}": 0.5
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "AttackDamage": 0.699999988079071,
                "Healing": 0.20000000298023224,
                "{88ef08c2}": 0.5
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_4_Slayer.tex",
    "name": "Slayer"
},
{
    "apiName": "TFT14_ViegoUniqueTrait",
    "desc": "Gain a hologram copy of the highest cost enemy Viego helped kill last round. It has @Level1Health@/@Level2Health@/@Level3Health@ Health, deals @Level1Damage*100@%/@Level2Damage*100@%/@Level3Damage*100@% damage, and has @ItemCount@ recommended item.",
    "effects": [
        {
            "maxUnits": 25000,
            "minUnits": 1,
            "style": 4,
            "variables": {
                "ItemCount": 1,
                "{1a9b5d47}": 2.0,
                "{3e1815e0}": 3000,
                "{57bdd6b7}": 900,
                "{676a4ba8}": 0.4000000059604645,
                "{80354075}": 0.30000001192092896,
                "{a6d2de92}": 600
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_SoulKiller.TFT_Set14.tex",
    "name": "Soul Killer"
},
{
    "apiName": "TFT14_Cyberboss",
    "desc": "Your strongest Cyberboss upgrades to its final form and gains Health, Ability Power, and its ability hits more&nbsp;enemies.<br><br><row>(@MinUnits@) @BossPercentHealth*100@%&nbsp;%i:scaleHealth%, @BossAP@&nbsp;%i:scaleAP% </row><br><row>(@MinUnits@) @BossPercentHealth*100@%&nbsp;%i:scaleHealth%, @BossAP@&nbsp;%i:scaleAP% </row><br><row>(@MinUnits@) All Cyberbosses upgrade. Your strongest Cyberboss gains @BigBossPercentHealth*100@% %i:scaleHealth% and @BigBossAP@ %i:scaleAP%.</row>",
    "effects": [
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "{23b17109}": 0.800000011920929,
                "{38e1c4bf}": 0.18000000715255737,
                "{57be2e24}": 0.30000001192092896,
                "{6b2da2a5}": 15.0,
                "{7d488deb}": 0.33000001311302185,
                "{ab4bceb1}": 30,
                "{c7b34fa5}": 0.3499999940395355
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "{23b17109}": 0.800000011920929,
                "{38e1c4bf}": 0.25,
                "{57be2e24}": 0.30000001192092896,
                "{6b2da2a5}": 25.0,
                "{7d488deb}": 0.33000001311302185,
                "{ab4bceb1}": 30,
                "{c7b34fa5}": 0.3499999940395355
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 4,
            "style": 5,
            "variables": {
                "{23b17109}": 0.800000011920929,
                "{38e1c4bf}": 0.25,
                "{57be2e24}": 0.30000001192092896,
                "{6b2da2a5}": 25.0,
                "{7d488deb}": 0.33000001311302185,
                "{ab4bceb1}": 30,
                "{c7b34fa5}": 0.3499999940395355
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Cyberbosses.TFT_Set14.tex",
    "name": "Cyberboss"
},
{
    "apiName": "TFT14_Cutter",
    "desc": "Executioner Abilities can critically strike. They also gain bonus Critical Strike Chance and Critical Strike Damage.<br><br>If the target's Health is below @HealthThreshold*100@%, the bonus Critical Strike Damage is doubled.<br><br><row>(@MinUnits@) @CRIT_PERCENT*100@%&nbsp;%i:scaleCrit%, @CRIT_DAMAGE*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CRIT_PERCENT*100@%&nbsp;%i:scaleCrit%, @CRIT_DAMAGE*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CRIT_PERCENT*100@%&nbsp;%i:scaleCrit%, @CRIT_DAMAGE*100@%&nbsp;%i:scaleCritMult%</row><br><row>(@MinUnits@) @CRIT_PERCENT*100@%&nbsp;%i:scaleCrit%, @CRIT_DAMAGE*100@%&nbsp;%i:scaleCritMult%; also gain @DamageReduction*100@% Durability</row>",
    "effects": [
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "CRIT_DAMAGE": 0.07999999821186066,
                "CRIT_PERCENT": 0.25,
                "DamageReduction": null,
                "HealthThreshold": 0.30000001192092896,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "CRIT_DAMAGE": 0.15000000596046448,
                "CRIT_PERCENT": 0.3499999940395355,
                "DamageReduction": null,
                "HealthThreshold": 0.30000001192092896,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 4,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "CRIT_DAMAGE": 0.20000000298023224,
                "CRIT_PERCENT": 0.44999998807907104,
                "DamageReduction": null,
                "HealthThreshold": 0.30000001192092896,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 5,
            "style": 5,
            "variables": {
                "CRIT_DAMAGE": 0.25,
                "CRIT_PERCENT": 0.550000011920929,
                "DamageReduction": 0.15000000596046448,
                "HealthThreshold": 0.30000001192092896,
                "{696854de}": 20.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_4_Executioner.tex",
    "name": "Executioner"
},
{
    "apiName": "TFT14_Armorclad",
    "desc": "Your team gains @TeamwideArmor@ Armor and Magic Resist. Bastions gain more.<br><br>For the first @Duration@ seconds of combat, Bastions increase their bonus by @StatMultiplier*100@%.<br><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR% </row><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR% </row><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR% Non-Bastions gain an additional @EnhancedTeamwideArmor@ %i:scaleArmor%%i:scaleMR%.</row>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "BonusArmor": 18.0,
                "BonusMR": 18.0,
                "Duration": 10.0,
                "StatMultiplier": 1.0,
                "{2812f038}": 40.0,
                "{696854de}": 20.0,
                "{e6c715a2}": 10.0
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "BonusArmor": 50.0,
                "BonusMR": 50.0,
                "Duration": 10.0,
                "StatMultiplier": 1.0,
                "{2812f038}": 40.0,
                "{696854de}": 20.0,
                "{e6c715a2}": 10.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "BonusArmor": 90.0,
                "BonusMR": 90.0,
                "Duration": 10.0,
                "StatMultiplier": 1.0,
                "{2812f038}": 40.0,
                "{696854de}": 20.0,
                "{e6c715a2}": 10.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_9_Bastion.tex",
    "name": "Bastion"
},
{
    "apiName": "TFT14_EdgeRunner",
    "desc": "Gain unique items that can only be equipped by Exotech champions. They gain Health and Attack Speed for each item equipped.<br><br><row>(@MinUnits@) @HealthBonus@ %i:scaleHealth%, @ASBonus@% %i:scaleAS%,<br>@TFTUnitProperty.trait:TFT14_Cybernetic_Item1@</row><br><row>(@MinUnits@) @HealthBonus@ %i:scaleHealth%, @ASBonus@% %i:scaleAS%,<br>@TFTUnitProperty.trait:TFT14_Cybernetic_Item2@</row><br><row>(@MinUnits@) @HealthBonus@ %i:scaleHealth%, @ASBonus@% %i:scaleAS%,<br>@TFTUnitProperty.trait:TFT14_Cybernetic_Item3@</row> <br><row>(@MinUnits@) @HealthBonus@ %i:scaleHealth%, @ASBonus@% %i:scaleAS%,<br>Enhance. </row> ",
    "effects": [
        {
            "maxUnits": 4,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "ASBonus": 2.0,
                "HealthBonus": 30.0,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 6,
            "minUnits": 5,
            "style": 3,
            "variables": {
                "ASBonus": 3.0,
                "HealthBonus": 110.0,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 9,
            "minUnits": 7,
            "style": 5,
            "variables": {
                "ASBonus": 7.0,
                "HealthBonus": 200.0,
                "{696854de}": 20.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 10,
            "style": 6,
            "variables": {
                "ASBonus": 40.0,
                "HealthBonus": 500.0,
                "{696854de}": 20.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Exotech.TFT_Set14.tex",
    "name": "Exotech"
},
{
    "apiName": "TFT14_Overlord",
    "desc": "The Overlord takes a bite out of the unit in the hex behind him, dealing @HPPercentDamage*100@% of their max Health as true damage. He gains @PercentHPGain*100@% of their Health and @PercentADGain*100@% of their Attack Damage.",
    "effects": [
        {
            "maxUnits": 25000,
            "minUnits": 1,
            "style": 4,
            "variables": {
                "{260807d8}": 0.33000001311302185,
                "{2d542917}": 0.4000000059604645,
                "{2f5370b8}": 1.0,
                "{3b5ffaa0}": 1.0,
                "{52e98675}": 0.4000000059604645,
                "{c028da4f}": 1.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Overlord.TFT_Set14.tex",
    "name": "Overlord"
},
{
    "apiName": "TFT14_Netgod",
    "desc": "After @Rounds@ player combats, open an Armory of Trait Mods that permanently reprogram a champion to benefit from a trait (but not contribute).<br><br>Every time you get a Trait Mod, the next one requires @RoundIncrement@ additional round.<br><br>Rounds remaining: @TFTUnitProperty.trait:TFT14_Netgod_RoundsRemaining@<br><rules>Champions can only have one Trait Mod.</rules><br><br>Equipped Mods:<br><ShowIf.TFT14_Netgod_Slot1>@TFTUnitProperty.trait:TFT14_Netgod_Trait1@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ1@<br><ShowIf.TFT14_Netgod_Slot2>@TFTUnitProperty.trait:TFT14_Netgod_Trait2@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ2@<br><ShowIf.TFT14_Netgod_Slot3>@TFTUnitProperty.trait:TFT14_Netgod_Trait3@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ3@<br><ShowIf.TFT14_Netgod_Slot4>@TFTUnitProperty.trait:TFT14_Netgod_Trait4@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ4@<br><ShowIf.TFT14_Netgod_Slot5>@TFTUnitProperty.trait:TFT14_Netgod_Trait5@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ5@<br><ShowIf.TFT14_Netgod_Slot6>@TFTUnitProperty.trait:TFT14_Netgod_Trait6@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ6@<br><ShowIf.TFT14_Netgod_Slot7>@TFTUnitProperty.trait:TFT14_Netgod_Trait7@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ7@<br><ShowIf.TFT14_Netgod_Slot8>@TFTUnitProperty.trait:TFT14_Netgod_Trait8@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ8@<br><ShowIf.TFT14_Netgod_Slot9>@TFTUnitProperty.trait:TFT14_Netgod_Trait9@ - @TFTUnitProperty.trait:TFT14_Netgod_Champ9@</ShowIf.TFT14_Netgod_Slot9></ShowIf.TFT14_Netgod_Slot8></ShowIf.TFT14_Netgod_Slot7></ShowIf.TFT14_Netgod_Slot6></ShowIf.TFT14_Netgod_Slot5></ShowIf.TFT14_Netgod_Slot4></ShowIf.TFT14_Netgod_Slot3></ShowIf.TFT14_Netgod_Slot2></ShowIf.TFT14_Netgod_Slot1>",
    "effects": [
        {
            "maxUnits": 25000,
            "minUnits": 1,
            "style": 4,
            "variables": {
                "rounds": 2.0,
                "{25ec242e}": 9.0,
                "{f3d51ef8}": 1
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_GodoftheNet.TFT_Set14.tex",
    "name": "God of the Net"
},
{
    "apiName": "TFT14_Swift",
    "desc": "Your team gains @TeamBonus*100@% Attack Speed. Rapidfire champions gain more on each attack, stacking up to @MaxStacks@ times.<br><br><expandRow>(@MinUnits@) @AttackSpeed*100@% %i:scaleAS% per stack</expandRow>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "AttackSpeed": 0.03999999910593033,
                "MaxStacks": 10.0,
                "{696854de}": 20.0,
                "{b6739a03}": 0.10000000149011612
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "AttackSpeed": 0.10000000149011612,
                "MaxStacks": 10.0,
                "{696854de}": 20.0,
                "{b6739a03}": 0.10000000149011612
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "AttackSpeed": 0.2199999988079071,
                "MaxStacks": 10.0,
                "{696854de}": 20.0,
                "{b6739a03}": 0.10000000149011612
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_10_Rapidfire.tex",
    "name": "Rapidfire"
},
{
    "apiName": "TFT14_Controller",
    "desc": "<spellPassive>Combat Start:</spellPassive> Allies in the back 2 rows gain Damage Amp. Allies in the front 2 rows gain Durability. Strategists get triple.<br><br><expandRow>(@MinUnits@) @DamageAmp*100@% %i:scaleDA%, @Durability*100@% %i:scaleDR%</expandRow>",
    "effects": [
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "DamageAmp": 0.07000000029802322,
                "Durability": 0.05000000074505806,
                "{c4205fb0}": 2.0
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "DamageAmp": 0.10999999940395355,
                "Durability": 0.07000000029802322,
                "{c4205fb0}": 2.0
            }
        },
        {
            "maxUnits": 4,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "DamageAmp": 0.1599999964237213,
                "Durability": 0.10999999940395355,
                "{c4205fb0}": 2.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 5,
            "style": 5,
            "variables": {
                "DamageAmp": 0.20000000298023224,
                "Durability": 0.12999999523162842,
                "{c4205fb0}": 2.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_9_Strategist.tex",
    "name": "Strategist"
},
{
    "apiName": "TFT14_Bruiser",
    "desc": "Your team gains @TeamwideHealth@ Health. Bruisers gain more.<br><br><expandRow>(@MinUnits@) @HealthBonus*100@% %i:scaleHealth% </expandRow>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "HealthBonus": 0.20000000298023224,
                "{696854de}": 20.0,
                "{ba40d775}": 100.0
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "HealthBonus": 0.44999998807907104,
                "{696854de}": 20.0,
                "{ba40d775}": 100.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "HealthBonus": 0.75,
                "{696854de}": 20.0,
                "{ba40d775}": 100.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Bruiser.TFT_Set14.tex",
    "name": "Bruiser"
},
{
    "apiName": "TFT14_Marksman",
    "desc": "Marksmen gain Attack Damage. After @EnhancedTime@ seconds of combat, they increase their bonus by @EnhancedBonus*100@%.<br><br><row>(@MinUnits@) @BonusAD*100@%&nbsp;%i:scaleAD%</row><br><row>(@MinUnits@) @BonusAD*100@%&nbsp;%i:scaleAD%. After @EnhancedTime@&nbsp;seconds, gain @RepeatBonus*100@%&nbsp;%i:scaleAD% every @RepeatTime@&nbsp;seconds.</row>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "BonusAD": 0.18000000715255737,
                "RepeatTime": null,
                "{696854de}": 20.0,
                "{6ab0afa6}": 8.0,
                "{9696a6ba}": 1.0,
                "{b6739a03}": null,
                "{c3eaf65d}": null
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 4,
            "style": 5,
            "variables": {
                "BonusAD": 0.4000000059604645,
                "RepeatTime": 6.0,
                "{696854de}": 20.0,
                "{6ab0afa6}": 8.0,
                "{9696a6ba}": 1.0,
                "{b6739a03}": null,
                "{c3eaf65d}": 0.20000000298023224
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Marksman.TFT_Set14.tex",
    "name": "Marksman"
},
{
    "apiName": "TFT14_Immortal",
    "desc": "Golden Ox gain Damage Amp and have a chance to drop gold on kill.<br><br>If you spend @TFTUnitProperty.trait:TFT14_Immortal_GoldNeededForBreakpoint@ gold on rerolls or XP in a single turn, permanently increase their Damage Amp and the gold required for the next bonus. Rerolls count double towards gold spent.<br><rules>(Golden Ox must have fought last round)</rules><br><br><row>(@MinUnits@) @DamageAmp*100@% %i:scaleDA%, @KillDrop*100@% gold</row><br><row>(@MinUnits@) @DamageAmp*100@% %i:scaleDA%, @KillDrop*100@% gold</row><br><row>(@MinUnits@) @DamageAmp*100@% %i:scaleDA%, @KillDrop*100@% loot, @ComponentDropChance*100@% chance loot is a component</row><br>Current Bonus: @TFTUnitProperty.trait:TFT14_Immortal_GoldBonusStacks@% %i:scaleDA%",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "DamageAmp": 0.18000000715255737,
                "{0bd4b104}": 1.0,
                "{12bbe349}": null,
                "{19e84ec6}": 1.0,
                "{24626b4a}": 0.07999999821186066,
                "{38d15b70}": null,
                "{786dea50}": 0.20000000298023224,
                "{85d365ea}": null,
                "{d0e12874}": 7.0,
                "{e29303a0}": null
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "DamageAmp": 0.20000000298023224,
                "{0bd4b104}": 1.0,
                "{12bbe349}": null,
                "{19e84ec6}": 1.0,
                "{24626b4a}": 0.07999999821186066,
                "{38d15b70}": null,
                "{786dea50}": 0.4000000059604645,
                "{85d365ea}": null,
                "{d0e12874}": 4.0,
                "{e29303a0}": null
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "DamageAmp": 0.2199999988079071,
                "{0bd4b104}": 1.0,
                "{12bbe349}": 0.07000000029802322,
                "{19e84ec6}": 1.0,
                "{24626b4a}": 0.07999999821186066,
                "{38d15b70}": null,
                "{786dea50}": 0.6600000262260437,
                "{85d365ea}": null,
                "{d0e12874}": 3.0,
                "{e29303a0}": null
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_GoldenOx.TFT_Set14.tex",
    "name": "Golden Ox"
},
{
    "apiName": "TFT14_BallisTek",
    "desc": "BoomBots fire a missile every @DamageDealtThreshold@ damage dealt at a nearby enemy that deals magic damage. @DamageTakenMod*100@% of damage taken contributes to damage dealt.<br><br><row>(@MinUnits@) @MissileDamage@ magic damage</row><br><row>(@MinUnits@) @MissileDamage@ magic damage</row><br><row>(@MinUnits@) Fire two missiles, each dealing @MissileDamage@ magic damage</row>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "MissileDamage": 145.0,
                "{540aad25}": 0.07999999821186066,
                "{91f7abc1}": 400.0
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "MissileDamage": 310.0,
                "{540aad25}": 0.07999999821186066,
                "{91f7abc1}": 400.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "MissileDamage": 190.0,
                "{540aad25}": 0.07999999821186066,
                "{91f7abc1}": 400.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_BoomBots.TFT_Set14.tex",
    "name": "BoomBot"
},
{
    "apiName": "TFT14_Techie",
    "desc": "Techies gain Ability Power.<br><br>Enemies hit by their abilities deal @DamageAmpDebuff*100@% less damage for @DebuffDuration@ seconds.<br><br><row>(@MinUnits@) @APBonus@ %i:scaleAP%</row><br><row>(@MinUnits@) @APBonus@ %i:scaleAP%</row><br><row>(@MinUnits@) @APBonus@ %i:scaleAP%</row><br><row>(@MinUnits@) @APBonus@ %i:scaleAP% Enemies hit deal @EnhancedDebuff*100@% less damage.</row>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "APBonus": 15.0,
                "DebuffDuration": 3.0,
                "{11b60890}": 0.10000000149011612,
                "{440affed}": 0.18000000715255737
            }
        },
        {
            "maxUnits": 5,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "APBonus": 45.0,
                "DebuffDuration": 3.0,
                "{11b60890}": 0.10000000149011612,
                "{440affed}": 0.18000000715255737
            }
        },
        {
            "maxUnits": 7,
            "minUnits": 6,
            "style": 5,
            "variables": {
                "APBonus": 80.0,
                "DebuffDuration": 3.0,
                "{11b60890}": 0.10000000149011612,
                "{440affed}": 0.18000000715255737
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 8,
            "style": 5,
            "variables": {
                "APBonus": 110.0,
                "DebuffDuration": 3.0,
                "{11b60890}": 0.10000000149011612,
                "{440affed}": 0.18000000715255737
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Techie.TFT_Set14.tex",
    "name": "Techie"
},
{
    "apiName": "TFT14_Thirsty",
    "desc": "Every @Timer@ seconds, your team gains Mana. Dynamos gain @ThirstyBonus*100@% more.<br><br><row>(@MinUnits@) @Mana@ %i:scaleMana% </row><br><row>(@MinUnits@) @Mana@ %i:scaleMana% </row><br><row>(@MinUnits@) @Mana@ %i:scaleMana% </row>",
    "effects": [
        {
            "maxUnits": 2,
            "minUnits": 2,
            "style": 1,
            "variables": {
                "Mana": 5.0,
                "Timer": 3.0,
                "{696854de}": 20.0,
                "{f31c7b07}": 1.0
            }
        },
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 3,
            "variables": {
                "Mana": 7.0,
                "Timer": 3.0,
                "{696854de}": 20.0,
                "{f31c7b07}": 1.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 4,
            "style": 5,
            "variables": {
                "Mana": 10.0,
                "Timer": 3.0,
                "{696854de}": 20.0,
                "{f31c7b07}": 1.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Dynamo.TFT_Set14.tex",
    "name": "Dynamo"
},
{
    "apiName": "TFT14_Virus",
    "desc": "The Virus infects your shop with a @ChanceToSee@% chance to spawn a bloblet. When purchased, it merges and increases the strongest Zac's max Health by @BonusPercentHPPerStack*100@% and Ability Power by @BonusAPPerStack@. <br><br><TFTTracker>(Total Bloblets: <TFTBonus>@TFTUnitProperty.trait:TFT14_Virus_Stacks@</TFTBonus>)</TFTTracker>",
    "effects": [
        {
            "maxUnits": 25000,
            "minUnits": 1,
            "style": 4,
            "variables": {
                "BonusAPPerStack": 5.0,
                "{1e6d4a33}": 10.0,
                "{978a9814}": 0.029999999329447746
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Virus.TFT_Set14.tex",
    "name": "Virus"
},
{
    "apiName": "TFT14_Mob",
    "desc": "Get a Kingpin hat that uniquely upgrades a Syndicate champion's ability.<br><br>Syndicate champions gain Health and Damage Amp.<br><br><row>(@MinUnits@) @MobHealth@ %i:scaleHealth%, @DamageAmp*100@% %i:scaleDA%, @NumBosses@ Kingpin</row><br><row>(@MinUnits@) @MobHealth@ %i:scaleHealth%, @DamageAmp*100@% %i:scaleDA%, @NumBosses@ Kingpins</row><br><row>(@MinUnits@) @MobHealth@ %i:scaleHealth%, @DamageAmp*100@% %i:scaleDA%, Upgrade Kingpin effect</row>",
    "effects": [
        {
            "maxUnits": 4,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "DamageAmp": 0.05000000074505806,
                "{09065692}": 1,
                "{61b5370e}": 1,
                "{6cc5531f}": 100.0
            }
        },
        {
            "maxUnits": 6,
            "minUnits": 5,
            "style": 3,
            "variables": {
                "DamageAmp": 0.20000000298023224,
                "{09065692}": 2,
                "{61b5370e}": 2,
                "{6cc5531f}": 450.0
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 7,
            "style": 5,
            "variables": {
                "DamageAmp": 0.30000001192092896,
                "{09065692}": 2,
                "{61b5370e}": 2,
                "{6cc5531f}": 600.0
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Mob.TFT_Set14.tex",
    "name": "Syndicate"
},
{
    "apiName": "TFT14_HotRod",
    "desc": "Every round, Nitro champions grant Chrome to R-080T, based on their star level. Each Chrome grants @HealthPerScrap@ Health and @APPerScrap@ Ability Power. <br><br>At @FourStarScrapThreshold@ Chrome, it upgrades to T-43X! <br><br><row>(@MinUnits@) Summon R-080T!</row><br><row>(@MinUnits@) Fire a giant laser!</row><br><br><rules>Chrome per star: @ScrapPerOneStar@/@ScrapPerTwoStar@/@ScrapPerThreeStar@/@ScrapPerFourStar@</rules>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "{00933536}": 400,
                "{0903a0c3}": null,
                "{093846b7}": null,
                "{10423961}": null,
                "{4d6eede4}": null,
                "{4eb7d3e8}": 1300,
                "{8911c1f3}": 14.0,
                "{8a85bbd1}": 200.0,
                "{a691af58}": 1.0,
                "{bba458bd}": null,
                "{bbd3f177}": 130.0,
                "{c5d6c3d5}": 60.0,
                "{e75fa38f}": 850,
                "{f38b0f5d}": 100
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 4,
            "style": 5,
            "variables": {
                "{00933536}": 400,
                "{0903a0c3}": null,
                "{093846b7}": null,
                "{10423961}": null,
                "{4d6eede4}": null,
                "{4eb7d3e8}": 1300,
                "{8911c1f3}": 14.0,
                "{8a85bbd1}": 200.0,
                "{a691af58}": 1.0,
                "{bba458bd}": null,
                "{bbd3f177}": 130.0,
                "{c5d6c3d5}": 60.0,
                "{e75fa38f}": 850,
                "{f38b0f5d}": 100
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_NitroForge.TFT_Set14.tex",
    "name": "Nitro"
},
{
    "apiName": "TFT14_Suits",
    "desc": "Gain Intel by losing combat, increased for loss streaks. Gain a small amount for killing&nbsp;enemies. <br><br>You may trade your Intel for loot one time on round<br>@CashoutStage1@-@CashoutRound1@, @CashoutStage2@-@CashoutRound2@, @CashoutStage3@-@CashoutRound3@, @CashoutStage4@-@CashoutRound4@, or @CashoutStage5@-@CashoutRound5@.<br>After trading Intel, Cypher champions gain Attack Damage and Ability Power.<br><br><expandRow>(@MinUnits@) @ValueMultiplier@x Intel, @AttackDamage*100@% %i:scaleAD%%i:scaleAP%</expandRow>",
    "effects": [
        {
            "maxUnits": 3,
            "minUnits": 3,
            "style": 1,
            "variables": {
                "AbilityPower": 25.0,
                "AttackDamage": 0.25,
                "{10472c4d}": 1.0,
                "{1f98073f}": 0.029999999329447746,
                "{2c9b3e4e}": 0.5,
                "{48df4661}": 5,
                "{76664467}": null,
                "{7d910997}": null,
                "{8d9e3028}": 2.0,
                "{bd1003e3}": null,
                "{be100576}": null,
                "{bf100709}": null,
                "{c010089c}": null,
                "{c1100a2f}": null,
                "{c68adc9e}": null,
                "{c78ade31}": null,
                "{c88adfc4}": null,
                "{c98ae157}": null,
                "{cb8ae47d}": null,
                "{f2f00c97}": null
            }
        },
        {
            "maxUnits": 4,
            "minUnits": 4,
            "style": 3,
            "variables": {
                "AbilityPower": 35.0,
                "AttackDamage": 0.3499999940395355,
                "{10472c4d}": 1.5,
                "{1f98073f}": 0.029999999329447746,
                "{2c9b3e4e}": 0.5,
                "{48df4661}": 5,
                "{76664467}": null,
                "{7d910997}": null,
                "{8d9e3028}": 2.0,
                "{bd1003e3}": null,
                "{be100576}": null,
                "{bf100709}": null,
                "{c010089c}": null,
                "{c1100a2f}": null,
                "{c68adc9e}": null,
                "{c78ade31}": null,
                "{c88adfc4}": null,
                "{c98ae157}": null,
                "{cb8ae47d}": null,
                "{f2f00c97}": null
            }
        },
        {
            "maxUnits": 25000,
            "minUnits": 5,
            "style": 5,
            "variables": {
                "AbilityPower": 45.0,
                "AttackDamage": 0.44999998807907104,
                "{10472c4d}": 2.0,
                "{1f98073f}": 0.029999999329447746,
                "{2c9b3e4e}": 0.5,
                "{48df4661}": 5,
                "{76664467}": null,
                "{7d910997}": null,
                "{8d9e3028}": 2.0,
                "{bd1003e3}": null,
                "{be100576}": null,
                "{bf100709}": null,
                "{c010089c}": null,
                "{c1100a2f}": null,
                "{c68adc9e}": null,
                "{c78ade31}": null,
                "{c88adfc4}": null,
                "{c98ae157}": null,
                "{cb8ae47d}": null,
                "{f2f00c97}": null
            }
        }
    ],
    "icon": "ASSETS/UX/TraitIcons/Trait_Icon_14_Cypher.TFT_Set14.tex",
    "name": "Cypher"
}
]

export default sinergiasData;