export const radiantsItems = [
  {
      "apiName": "TFT5_Item_DragonsClawRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> de Vida Máxima.<br><br>Cura un @PercentHealthDamage@% de la Vida Máxima cada <TFTRadiantItemBonus>@HealthRegenInterval@</TFTRadiantItemBonus> seg.<br>",
      "effects": {
          "HealthRegenInterval": 2,
          "ICD": 0.5,
          "MagicResist": 115,
          "MaxHealthRegen": 2,
          "PercentHealthDamage": 10,
          "PercentMaxHP": 0.15000000596046448
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/dragons_claw_radiant.png",
      "name": "Voluntad del Dragón"
  },
  {
      "apiName": "TFT5_Item_TrapClawRadiant",
      "desc": "Tras infligir daño a un escudo, obtienes un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de Amplificación de daño durante @Duration@ seg.",
      "effects": {
          "AP": 30,
          "AS": 30,
          "CritChance": 20,
          "DamageAmp": 0.4000000059604645,
          "DamageAmpPct": 40,
          "Duration": 3,
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/stridebreaker-radiant.png",
      "name": "Quebrantavoluntades"
  },
  {
      "apiName": "TFT5_Item_IonicSparkRadiant",
      "desc": "<TFTKeyword>Rasga</TFTKeyword> por un @MRShred@% a los enemigos dentro de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos. Cuando los enemigos lanzan una habilidad, reciben daño mágico equivalente a un <TFTRadiantItemBonus>@ManaRatio@%</TFTRadiantItemBonus> del Maná gastado.<br><br><TFTRadiantItemBonus>Además, cura un @MaxHealthRegen@% de la Vida máxima por segundo.</TFTRadiantItemBonus><br><br><tftitemrules>[Objeto de daño directo]<br><tftbold>Rasgadura</tftbold>: Reduce la resistencia mágica</tftitemrules>",
      "effects": {
          "AP": 15,
          "Health": 200,
          "HealthRegenInterval": 1,
          "HexRange": 3,
          "MRShred": 30,
          "MagicResist": 40,
          "ManaRatio": 200,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/ionic_spark_radiant.png",
      "name": "Chispa Covalente"
  },
  {
      "apiName": "TFT5_Item_QuicksilverRadiant",
      "desc": "Inicio del combate: Obtiene inmunidad a los efectos de control de masas durante <TFTRadiantItemBonus>@SpellShieldDuration@</TFTRadiantItemBonus> seg. <TFTRadiantItemBonus>Durante @ASTotalDuration@ seg, obtiene un @ProcAttackSpeed*100@% de Velocidad de Ataque cada @ProcInterval@ seg.</TFTRadiantItemBonus><br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AS": 50,
          "ASTotalDuration": 14,
          "CritChance": 40,
          "MagicResist": 30,
          "ProcAttackSpeed": 0.09000000357627869,
          "ProcInterval": 2,
          "SpellShieldDuration": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/quicksilver_radiant.png",
      "name": "Capa Megamercurial"
  },
  {
      "apiName": "TFT5_Item_HextechGunbladeRadiant",
      "desc": "Cura al aliado con el menor porcentaje de Vida en un <TFTRadiantItemBonus>@AllyHealing*100@%</TFTRadiantItemBonus> del daño infligido.<br><br><TFTTrackerLabel>Curación de aliados:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AllyHealing": 0.3499999940395355,
          "Omnivamp": 35,
          "StatOmnivamp": 0.3499999940395355
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/hextech_gunblade_radiant.png",
      "name": "Sable de Vida Hextech"
  },
  {
      "apiName": "TFT5_Item_StatikkShivRadiant",
      "desc": "Cada tercer ataque inflige <TFTRadiantItemBonus>@Damage@</TFTRadiantItemBonus> de daño mágico y <TFTKeyword>Rasga</TFTKeyword> por un @MRShred@% a <TFTRadiantItemBonus>@1StarBounces@</TFTRadiantItemBonus> enemigos durante @MRShredDuration@ seg.<br><br><tftitemrules><tftbold>Rasgadura</tftbold>: Reduce la resistencia mágica</tftitemrules>",
      "effects": {
          "1StarBounces": 8,
          "AP": 50,
          "AS": 20,
          "Damage": 95,
          "MRShred": 30,
          "MRShredDuration": 5,
          "Mana": 15,
          "{12a15e9e}": 8,
          "{15144cec}": 8,
          "{79e2ec7b}": 8
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/statikk_shiv_radiant.png",
      "name": "Favor de Statikk"
  },
  {
      "apiName": "TFT5_Item_FrozenHeartRadiant",
      "desc": "Una vez por combate, al tener un @HealthThreshold@% de Vida, obtienes un escudo equivalente al <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> de tu Vida Máxima que dura hasta <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seg, y <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> de Resistencia Mágica.<br>",
      "effects": {
          "Armor": 40,
          "HealthThreshold": 40,
          "Mana": 30,
          "ShieldDuration": 10,
          "ShieldHealthPercent": 50,
          "Stats": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/fimbulwinter_radiant.png",
      "name": "Juramento del Bastión"
  },
  {
      "apiName": "TFT5_Item_BlueBuffRadiant",
      "desc": "El Maná Máximo se reduce en @ManaReduction@. <br><br>Cuando el portador logra un derribo, inflige un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de daño adicional durante <TFTRadiantItemBonus>@TakedownTimer@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules><br><br>",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "DamageAmp": 0.20000000298023224,
          "Mana": 20,
          "ManaReduction": 10,
          "TakedownTimer": 12
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/blue_buff_radiant.png",
      "name": "Bendición Azul"
  },
  {
      "apiName": "TFT5_Item_ArchangelsStaffRadiant",
      "desc": "Inicio del combate: Obtiene <TFTRadiantItemBonus>@APPerInterval@</TFTRadiantItemBonus> de Poder de Habilidad cada <TFTRadiantItemBonus>@IntervalSeconds@</TFTRadiantItemBonus> seg en combate.",
      "effects": {
          "AP": 50,
          "APPerInterval": 40,
          "IntervalSeconds": 4,
          "Mana": 15
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/archangel_staff_radiant.png",
      "name": "Báculo del Urfángel"
  },
  {
      "apiName": "TFT5_Item_MorellonomiconRadiant",
      "desc": "Los ataques y las habilidades <TFTKeyword>Queman</TFTKeyword> por un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hieren</TFTKeyword> por un @GrievousWoundsPercent@% a los enemigos durante <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: Reduce las curaciones recibidas</tftitemrules>",
      "effects": {
          "AP": 50,
          "AS": 25,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 150,
          "MonsterCap": 150,
          "TicksPerSecond": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/morellonomicon_radiant.png",
      "name": "Morelluminomicón"
  },
  {
      "apiName": "TFT5_Item_BrambleVestRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> de Vida Máxima.<br><br>Recibe un <TFTRadiantItemBonus>@AutoDamageReduction*100@%</TFTRadiantItemBonus> de daño reducido de los ataques. Cuando recibe un ataque, inflige <TFTRadiantItemBonus>@1StarAoEDamage@</TFTRadiantItemBonus> de daño mágico a los enemigos adyacentes.<br><br><tftitemrules>Enfriamiento: @ICD@ seg</tftitemrules>",
      "effects": {
          "1StarAoEDamage": 175,
          "2StarAoEDamage": 175,
          "3StarAoEDamage": 175,
          "Armor": 100,
          "AutoDamageReduction": 0.25,
          "ICD": 2,
          "PercentMaxHP": 0.07999999821186066,
          "{b5c2a66b}": 175
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/bramble_vest_radiant.png",
      "name": "Vesta Espinas de Rosa"
  },
  {
      "apiName": "TFT5_Item_ZzRotPortalRadiant",
      "desc": "Invoca un gran Engendro del Vacío. Su fuerza aumenta en cada fase.<br><br>​​<tftitemrules>[Objeto soporte]<br>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "Health": 150,
          "SummonedStatReduction": 25,
          "{50a0dbb5}": 1,
          "{ef0bb7c2}": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft9_supportitems/zzrot_portal.png",
      "name": "Portal Zz'Rot"
  },
  {
      "apiName": "TFT5_Item_ShroudOfStillnessRadiant",
      "desc": "Inicio del combate: Dispara un <TFTRadiantItemBonus>rayo más ancho</TFTRadiantItemBonus> que <TFTKeyword>Saquea Maná</TFTKeyword> por un <TFTRadiantItemBonus>@CostIncrease@%</TFTRadiantItemBonus> a los enemigos.<br><TFTRadiantItemBonus>Tu equipo obtiene un %i:scaleMana% @AllyBonusMana@ de Maná inicial.</TFTRadiantItemBonus><br><br><tftitemrules>[Único: solo 1 por campeón]<br><tftbold>Saqueo de Maná</tftbold>: Aumenta el maná máximo hasta el próximo lanzamiento.</tftitemrules><br>",
      "effects": {
          "AllyBonusMana": 25,
          "Armor": 20,
          "CostIncrease": 50,
          "CritChance": 20,
          "Health": 400,
          "{4516a18d}": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/shroud_of_stillness_radiant.png",
      "name": "Manto de Reverencia"
  },
  {
      "apiName": "TFT5_Item_RunaansHurricaneRadiant",
      "desc": "Los ataques disparan un proyectil a un enemigo cercano, lo que inflige un <TFTRadiantItemBonus>@MultiplierForDamage@%</TFTRadiantItemBonus> de Daño de Ataque %i:scaleAD% como daño físico.<br>",
      "effects": {
          "AD": 0.3499999940395355,
          "AS": 20,
          "AdditionalTargets": 1,
          "MagicResist": 20,
          "MultiplierForDamage": 110
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/runaans_hurricane_radiant.png",
      "name": "Tempestad de Runaan"
  },
  {
      "apiName": "TFT5_Item_ZephyrRadiant",
      "desc": "Inicio del combate: Invoca un remolino en el lado opuesto de la arena que elimina del combate al enemigo más cercano durante <TFTRadiantItemBonus>@BanishDuration@</TFTRadiantItemBonus> seg.<br><TFTRadiantItemBonus>Tu equipo obtiene un %i:scaleAS% @AllyBonusAS@% de Velocidad de Ataque.</TFTRadiantItemBonus><br><br><tftitemrules>[Ignora las inmunidades de control de masas].<br>[Único: solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AS": 20,
          "AllyBonusAS": 15,
          "BanishDuration": 8,
          "Health": 300,
          "MagicResist": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/zephyr_radiant.png",
      "name": "Mistral"
  },
  {
      "apiName": "TFT5_Item_GuinsoosRagebladeRadiant",
      "desc": "Los ataques otorgan un <TFTRadiantItemBonus>@AttackSpeedPerStack@%</TFTRadiantItemBonus> de Velocidad de Ataque acumulable.",
      "effects": {
          "AP": 10,
          "AS": 20,
          "AttackSpeedPerStack": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/guinsoos_rageblade_radiant.png",
      "name": "Juicio Final de Guinsoo"
  },
  {
      "apiName": "TFT5_Item_HandOfJusticeRadiant",
      "desc": "Obtienes 2 efectos:<li><TFTRadiantItemBonus>@ADBuff*100@%</TFTRadiantItemBonus> de Daño de Ataque y <TFTRadiantItemBonus>@APBuff@</TFTRadiantItemBonus> de Poder de Habilidad.<li><TFTRadiantItemBonus>@Omnivamp*100@%</TFTRadiantItemBonus> de Omnivampirismo",
      "effects": {
          "ADBuff": 0.5,
          "APBuff": 50,
          "CritChance": 40,
          "Mana": 15,
          "Omnivamp": 0.30000001192092896,
          "TraitMultiplier": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/hand_of_justice_radiant.png",
      "name": "Puño de la Equidad"
  },
  {
      "apiName": "TFT5_Item_SunfireCapeRadiant",
      "desc": "Cada <TFTRadiantItemBonus>@ICD@</TFTRadiantItemBonus> seg, <TFTKeyword>Quema</TFTKeyword> por un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hiere</TFTKeyword> por un @GrievousWoundsPercent@% a un enemigo en un radio de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos durante <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: reduce las curaciones recibidas</tftitemrules>",
      "effects": {
          "Armor": 20,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 300,
          "HealthRegenInterval": "null",
          "HexRange": 3,
          "ICD": 1.5,
          "MaxHealthRegen": "null",
          "MonsterCap": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/sunfire_cape_radiant.png",
      "name": "Capa de Luz Solar"
  },
  {
      "apiName": "TFT5_Item_ZekesHeraldRadiant",
      "desc": "Inicio del combate: Otorga un %i:scaleAS% <TFTRadiantItemBonus>@AttackSpeed@%</TFTRadiantItemBonus> de Velocidad de Ataque y un <TFTRadiantItemBonus>@Lifesteal@% de</TFTRadiantItemBonus> <TFTKeyword>Omnivampirismo</TFTKeyword> al portador y a los aliados dentro de 1 hexágono en la misma fila.<br><br> <tftitemrules><tftbold>Omnivampirismo</tftbold>: Se cura un porcentaje del daño infligido</tftitemrules>",
      "effects": {
          "AD": 0.3499999940395355,
          "AttackSpeed": 35,
          "Health": 350,
          "HexRange": 1,
          "LifeSteal": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/zekes_herald_radiant.png",
      "name": "Armonía de Zeke"
  },
  {
      "apiName": "TFT5_Item_LastWhisperRadiant",
      "desc": "El daño físico infligido aplica un @ArmorReductionPercent@% de <TFTKeyword>desgarre</TFTKeyword> al objetivo por <TFTRadiantItemBonus>el resto del combate.</TFTRadiantItemBonus> Este efecto no se acumula.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Desgarre</tftbold>: Reduce la armadura</tftitemrules>",
      "effects": {
          "AD": 0.44999998807907104,
          "AS": 25,
          "ArmorBreakDuration": 50,
          "ArmorReductionPercent": 30,
          "CritChance": 55
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/last_whisper_radiant.png",
      "name": "Suspiro Eterno"
  },
  {
      "apiName": "TFT5_Item_LocketOfTheIronSolariRadiant",
      "desc": "Inicio del combate: Escuda al portador y a los aliados dentro de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos en la misma fila por <TFTRadiantItemBonus>@1StarShieldValue@/@2StarShieldValue@/@3StarShieldValue@</TFTRadiantItemBonus> %i:star% de daño durante <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seg.<br><TFTRadiantItemBonus>Tu equipo obtiene %i:scaleHealth% @BonusAllyHealth@ de Vida.</TFTRadiantItemBonus>",
      "effects": {
          "1StarShieldValue": 275,
          "2StarShieldValue": 325,
          "3StarShieldValue": 375,
          "AP": 10,
          "Armor": 20,
          "BonusAllyHealth": 200,
          "HexRange": 3,
          "ShieldDuration": 60,
          "{c78af25f}": 425
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/locket_of_the_iron_solari_radiant.png",
      "name": "Relicario del Targón Primigenio"
  },
  {
      "apiName": "TFT5_Item_ThiefsGlovesRadiant",
      "desc": "Cada ronda: Equipa 2 objetos <TFTRadiantItemBonus>Radiantes</TFTRadiantItemBonus> aleatorios.<br><br><tftitemrules>[Consume 3 espacios de objeto].</tftitemrules>",
      "effects": {
          "CritChance": 20,
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/thieves_gloves_radiant.png",
      "name": "Guantes de Bribón"
  },
  {
      "apiName": "TFT5_Item_WarmogsArmorRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@BonusPercentHP*100@%</TFTRadiantItemBonus> de Vida máxima.<br><br><TFTRadiantItemBonus>Cura un @MaxHealthRegen@% de la Vida Máxima por seg.</TFTRadiantItemBonus>",
      "effects": {
          "BonusPercentHP": 0.20000000298023224,
          "Health": 1000,
          "HealthRegenInterval": 1,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/warmogs_armor_radiant.png",
      "name": "Orgullo de Warmog"
  },
  {
      "apiName": "TFT5_Item_SteraksGageRadiant",
      "desc": "Una vez por combate, al tener un @HealthThreshold@% de Vida, obtiene un <TFTRadiantItemBonus>@BonusMaxHealthPerc@% de Vida Máxima</TFTRadiantItemBonus> y <TFTRadiantItemBonus>@BonusADToGive@% de Daño de Ataque</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.30000001192092896,
          "BonusADToGive": 60,
          "BonusMaxHealthPerc": 40,
          "Health": 400,
          "HealthThreshold": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/steraks_gage_radiant.png",
      "name": "Megaescudo de Sterak"
  },
  {
      "apiName": "TFT5_Item_RedemptionRadiant",
      "desc": "Cura a los aliados dentro de <TFTRadiantItemBonus>@HexRadius@</TFTRadiantItemBonus> hexágonos por un <TFTRadiantItemBonus>@MissingHealthHeal@%</TFTRadiantItemBonus> de su Vida faltante cada @HealTickRate@ seg. Además, obtienen un @AoEDamageReduction@% de Durabilidad por @HealTickRate@ seg (no se acumula).<br><br><TFTTrackerLabel>Curación:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AoEDamageReduction": 10,
          "HealTickRate": 5,
          "Health": 400,
          "HexRadius": 2,
          "Mana": 15,
          "MaxHeal": 2000,
          "MissingHealthHeal": 25
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/redemption_radiant.png",
      "name": "Absolución"
  },
  {
      "apiName": "TFT5_Item_GuardianAngelRadiant",
      "desc": "Una vez por combate: Al tener un @HealthThreshold@% de Vida, se vuelve inalcanzable por un tiempo breve y elimina los efectos negativos. Luego, se <TFTRadiantItemBonus>cura un @MissingHealthRestore*100@% de su Vida faltante y obtiene un @AttackSpeed@% de Velocidad de Ataque adicional</TFTRadiantItemBonus>. <br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AD": 0.30000001192092896,
          "Armor": 30,
          "AttackSpeed": 85,
          "DamageReduction": 100,
          "HealthThreshold": 60,
          "HealthThreshold2": 30,
          "MissingHealthRestore": 1,
          "StealthDuration": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/edge_of_night_radiant.png",
      "name": "Umbral del amanecer"
  },
  {
      "apiName": "TFT5_Item_RapidFirecannonRadiant",
      "desc": "Los ataques y las habilidades <TFTKeyword>Queman</TFTKeyword> un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hieren</TFTKeyword> un <TFTRadiantItemBonus>@HealingReductionPct@%</TFTRadiantItemBonus> a los enemigos durante @Duration@ seg.<br><br><tftitemrules><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: Reduce las curaciones recibidas</tftitemrules><br>",
      "effects": {
          "AS": 60,
          "BonusDamage": 0.10000000149011612,
          "BurnPercent": 2,
          "Duration": 5,
          "HealingReductionPct": 33,
          "HexRangeIncrease": 2,
          "{1543aa48}": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/redbuff_radiant.png",
      "name": "Blasón de Cenizas"
  },
  {
      "apiName": "TFT5_Item_NightHarvesterRadiant",
      "desc": "Obtienes un <TFTRadiantItemBonus>@BaseDurability*100@%</TFTRadiantItemBonus> de Durabilidad. Si tienes más de un <TFTRadiantItemBonus>@ThresholdForEmpower*100@%</TFTRadiantItemBonus> de Vida, obtienes un <TFTRadiantItemBonus>@EmpoweredDurability*100@%</TFTRadiantItemBonus> de Durabilidad.",
      "effects": {
          "Armor": 40,
          "BaseDamageReduction": 16,
          "BaseDurability": 0.1599999964237213,
          "CritChance": 20,
          "EmpowerDamageReduction": 30,
          "EmpoweredDurability": 0.30000001192092896,
          "Health": 500,
          "ThresholdForEmpower": 0.4000000059604645
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/behemoth_radiant.png",
      "name": "Legado del Coloso"
  },
  {
      "apiName": "TFT5_Item_TitansResolveRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@StackingAD*100@%</TFTRadiantItemBonus> de Daño de Ataque y <TFTRadiantItemBonus>@StackingSP@</TFTRadiantItemBonus> de Poder de Habilidad al atacar o recibir daño, lo que se acumula hasta @StackCap@ veces.<br><br>Al tener el máximo de acumulaciones, obtiene <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> de Resistencia Mágica.",
      "effects": {
          "AS": 30,
          "Armor": 35,
          "BonusResistsAtStackCap": 50,
          "StackCap": 25,
          "StackingAD": 0.029999999329447746,
          "StackingSP": 2
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/titans_resolve_radiant.png",
      "name": "Juramento del Titán"
  },
  {
      "apiName": "TFT5_Item_GiantSlayerRadiant",
      "desc": "Obtienes un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de Amplificación de daño contra enemigos con más de @HealthThreshold@ de Vida máxima.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AS": 10,
          "DamageAmp": 0.4000000059604645,
          "HealthThreshold": 1750,
          "LargeBonusPct": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/giant_slayer_radiant.png",
      "name": "Verdugo de Demonios"
  },
  {
      "apiName": "TFT5_Item_CrownguardRadiant",
      "desc": "Inicio del combate: Obtiene un escudo equivalente al <TFTRadiantItemBonus>@ShieldSize@%</TFTRadiantItemBonus> de su Vida Máxima durante @ShieldDuration@ seg. <br>Cuando el escudo desaparece, obtiene <TFTRadiantItemBonus>@ShieldBonusAP@ de Poder de Habilidad</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 40,
          "Armor": 40,
          "ChillDuration": 4,
          "Health": 200,
          "HexRange": 5,
          "ShieldBonusAP": 50,
          "ShieldDuration": 8,
          "ShieldSize": 50
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/crownguard_radiant.png",
      "name": "Escudo de la Corona Real"
  },
  {
      "apiName": "TFT5_Item_BloodthirsterRadiant",
      "desc": "Una vez por combate: Al tener un @HealthThreshold@% de Vida, obtienes un Escudo con un <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> de la Vida Máxima que dura hasta @ShieldDuration@ seg.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "HealthThreshold": 40,
          "LifeSteal": 40,
          "MagicResist": 20,
          "ShieldDuration": 5,
          "ShieldHealthPercent": 40,
          "StatOmnivamp": 0.4000000059604645
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/bloodthirster_radiant.png",
      "name": "La Sanguinaria Bendecida"
  },
  {
      "apiName": "TFT5_Item_RabadonsDeathcapRadiant",
      "desc": "",
      "effects": {
          "AP": 70,
          "BonusDamage": 0.5,
          "{1543aa48}": 0.33000001311302185
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/rabadons_deathcap_radiant.png",
      "name": "Sombrero Mortiascendido de Rabadon"
  },
  {
      "apiName": "TFT5_Item_JeweledGauntletRadiant",
      "desc": "Las habilidades pueden infligir golpes críticos.<br><br>Si las habilidades del portador ya pueden infligir golpes críticos, obtienen un @CritDamageToGive*100@% de daño de Golpe Crítico.",
      "effects": {
          "AP": 55,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/jeweled_gauntlet_radiant.png",
      "name": "Guantelete Glamoroso"
  },
  {
      "apiName": "TFT5_Item_GargoyleStoneplateRadiant",
      "desc": "Obtiene <TFTRadiantItemBonus>@ArmorPerEnemy@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@MRPerEnemy@</TFTRadiantItemBonus> de Resistencia Mágica por cada enemigo que tenga al portador como objetivo.<br><br><TFTRadiantItemBonus>Además, se cura un @MaxHealthRegen@% de Vida Máxima cada seg.</TFTRadiantItemBonus>",
      "effects": {
          "Armor": 50,
          "ArmorPerEnemy": 15,
          "Health": 250,
          "HealthRegenInterval": 1,
          "MRPerEnemy": 15,
          "MagicResist": 50,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/gargoyle_stoneplate_radiant.png",
      "name": "Armadura Pétrea de Dvarapala"
  },
  {
      "apiName": "TFT5_Item_ChaliceOfPowerRadiant",
      "desc": "Inicio del combate: Otorga %i:scaleAP% <TFTRadiantItemBonus>@ChaliceAP@</TFTRadiantItemBonus> de Poder de Habilidad <TFTRadiantItemBonus>y un @Spellvamp@% de <TFTKeyword>Omnivampirismo</TFTKeyword></TFTRadiantItemBonus> al portador y a los aliados dentro de 1 hexágono en la misma fila.<br><br>​​<tftitemrules><tftbold>Omnivampirismo</tftbold>: Se cura un porcentaje del daño infligido</tftitemrules>",
      "effects": {
          "ChaliceAP": 45,
          "HexRange": 1,
          "MagicResist": 45,
          "Mana": 45,
          "Spellvamp": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/chalice_of_power_radiant.png",
      "name": "Cáliz de Caridad"
  },
  {
      "apiName": "TFT5_Item_LeviathanRadiant",
      "desc": "Después de lanzar una habilidad, obtiene un <TFTRadiantItemBonus>@AttackSpeedToGive@% de Velocidad de Ataque</TFTRadiantItemBonus> durante <TFTRadiantItemBonus>@ASDuration@ seg</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 55,
          "AS": 20,
          "ASDuration": 8,
          "AttackSpeedToGive": 65,
          "Health": 200
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/nashors_tooth_radiant.png",
      "name": "Regalo del Barón"
  },
  {
      "apiName": "TFT5_Item_SpearOfShojinRadiant",
      "desc": "Los ataques otorgan <TFTRadiantItemBonus>@FlatManaRestore@ de Maná adicional</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "FlatManaRestore": 10,
          "Mana": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/spear_of_shojin_radiant.png",
      "name": "Lanza de Hirana"
  },
  {
      "apiName": "TFT5_Item_SpectralGauntletRadiant",
      "desc": "<TFTKeyword>Desgarra</TFTKeyword> por un @ARReductionAmount@% a los enemigos en los @HexRange@ hexágonos circundantes. Obtiene <TFTRadiantItemBonus> @BonusResists@ de Armadura y Resistencia Mágica</TFTRadiantItemBonus> durante los primeros <TFTRadiantItemBonus>@BonusResistDuration@ seg</TFTRadiantItemBonus> del combate.<br><br><tftitemrules><tftbold>Desgarre</tftbold>: Reduce la armadura</tftitemrules>",
      "effects": {
          "ARReductionAmount": 30,
          "BonusResistDuration": 15,
          "BonusResists": 50,
          "Health": 500,
          "HexRange": 3,
          "MagicResist": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/evenshroud_radiant.png",
      "name": "Equinoccio"
  },
  {
      "apiName": "TFT5_Item_InfinityEdgeRadiant",
      "desc": "Las habilidades pueden infligir golpes críticos.<br><br>Si las habilidades del portador ya pueden infligir golpes críticos, obtienen un @CritDamageToGive*100@% de daño de Golpe Crítico.",
      "effects": {
          "AD": 0.6499999761581421,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/infinity_edge_radiant.png",
      "name": "Filo del Cénit"
  },
  {
      "apiName": "TFT5_Item_DeathbladeRadiant",
      "desc": "",
      "effects": {
          "AD": 1.0499999523162842,
          "BonusDamage": 0.11999999731779099,
          "{1543aa48}": 0.11999999731779099
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/death_blade_radiant.png",
      "name": "Filo de la Muerte Luminoso"
  },
  {
      "apiName": "TFT5_Item_AdaptiveHelmRadiant",
      "desc": "Inicio del combate: Obtienes efectos adicionales según tu posición inicial.<br><br>Primeras dos filas: <TFTRadiantItemBonus>@FrontRowBonusResists@</TFTRadiantItemBonus> de Armadura y Resistencia Mágica. Obtienes <TFTRadiantItemBonus>@FrontLineManaPerHit@</TFTRadiantItemBonus> de Maná al ser impactado por un ataque.<br><br>Dos filas traseras: <TFTRadiantItemBonus>@BackRowBonusAP@</TFTRadiantItemBonus> de Poder de Habilidad. Obtienes <TFTRadiantItemBonus>@ManaPerTickrate@</TFTRadiantItemBonus> de Maná cada @ManaTickrate@ seg.<br>",
      "effects": {
          "AP": 25,
          "BackRowBonusAP": 55,
          "FrontLineManaPerHit": 2,
          "FrontRowBonusResists": 60,
          "MagicResist": 30,
          "Mana": 15,
          "ManaPerTickrate": 20,
          "ManaTickrate": 3,
          "TotalAPBonus": 40
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/adaptive_helm_radiant.png",
      "name": "Jak'Sho, el Proteico"
  }
]

export const radiants = [
  {
      "apiName": "TFT5_Item_DragonsClawRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> de Vida Máxima.<br><br>Cura un @PercentHealthDamage@% de la Vida Máxima cada <TFTRadiantItemBonus>@HealthRegenInterval@</TFTRadiantItemBonus> seg.<br>",
      "effects": {
          "HealthRegenInterval": 2,
          "ICD": 0.5,
          "MagicResist": 115,
          "MaxHealthRegen": 2,
          "PercentHealthDamage": 10,
          "PercentMaxHP": 0.15000000596046448
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/dragons_claw_radiant.png",
      "name": "Voluntad del Dragón"
  },
  {
      "apiName": "TFT5_Item_TrapClawRadiant",
      "desc": "Tras infligir daño a un escudo, obtienes un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de Amplificación de daño durante @Duration@ seg.",
      "effects": {
          "AP": 30,
          "AS": 30,
          "CritChance": 20,
          "DamageAmp": 0.4000000059604645,
          "DamageAmpPct": 40,
          "Duration": 3,
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/stridebreaker-radiant.png",
      "name": "Quebrantavoluntades"
  },
  {
      "apiName": "TFT5_Item_IonicSparkRadiant",
      "desc": "<TFTKeyword>Rasga</TFTKeyword> por un @MRShred@% a los enemigos dentro de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos. Cuando los enemigos lanzan una habilidad, reciben daño mágico equivalente a un <TFTRadiantItemBonus>@ManaRatio@%</TFTRadiantItemBonus> del Maná gastado.<br><br><TFTRadiantItemBonus>Además, cura un @MaxHealthRegen@% de la Vida máxima por segundo.</TFTRadiantItemBonus><br><br><tftitemrules>[Objeto de daño directo]<br><tftbold>Rasgadura</tftbold>: Reduce la resistencia mágica</tftitemrules>",
      "effects": {
          "AP": 15,
          "Health": 200,
          "HealthRegenInterval": 1,
          "HexRange": 3,
          "MRShred": 30,
          "MagicResist": 40,
          "ManaRatio": 200,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/ionic_spark_radiant.png",
      "name": "Chispa Covalente"
  },
  {
      "apiName": "TFT5_Item_QuicksilverRadiant",
      "desc": "Inicio del combate: Obtiene inmunidad a los efectos de control de masas durante <TFTRadiantItemBonus>@SpellShieldDuration@</TFTRadiantItemBonus> seg. <TFTRadiantItemBonus>Durante @ASTotalDuration@ seg, obtiene un @ProcAttackSpeed*100@% de Velocidad de Ataque cada @ProcInterval@ seg.</TFTRadiantItemBonus><br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AS": 50,
          "ASTotalDuration": 14,
          "CritChance": 40,
          "MagicResist": 30,
          "ProcAttackSpeed": 0.09000000357627869,
          "ProcInterval": 2,
          "SpellShieldDuration": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/quicksilver_radiant.png",
      "name": "Capa Megamercurial"
  },
  {
      "apiName": "TFT5_Item_HextechGunbladeRadiant",
      "desc": "Cura al aliado con el menor porcentaje de Vida en un <TFTRadiantItemBonus>@AllyHealing*100@%</TFTRadiantItemBonus> del daño infligido.<br><br><TFTTrackerLabel>Curación de aliados:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AllyHealing": 0.3499999940395355,
          "Omnivamp": 35,
          "StatOmnivamp": 0.3499999940395355
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/hextech_gunblade_radiant.png",
      "name": "Sable de Vida Hextech"
  },
  {
      "apiName": "TFT5_Item_StatikkShivRadiant",
      "desc": "Cada tercer ataque inflige <TFTRadiantItemBonus>@Damage@</TFTRadiantItemBonus> de daño mágico y <TFTKeyword>Rasga</TFTKeyword> por un @MRShred@% a <TFTRadiantItemBonus>@1StarBounces@</TFTRadiantItemBonus> enemigos durante @MRShredDuration@ seg.<br><br><tftitemrules><tftbold>Rasgadura</tftbold>: Reduce la resistencia mágica</tftitemrules>",
      "effects": {
          "1StarBounces": 8,
          "AP": 50,
          "AS": 20,
          "Damage": 95,
          "MRShred": 30,
          "MRShredDuration": 5,
          "Mana": 15,
          "{12a15e9e}": 8,
          "{15144cec}": 8,
          "{79e2ec7b}": 8
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/statikk_shiv_radiant.png",
      "name": "Favor de Statikk"
  },
  {
      "apiName": "TFT5_Item_FrozenHeartRadiant",
      "desc": "Una vez por combate, al tener un @HealthThreshold@% de Vida, obtienes un escudo equivalente al <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> de tu Vida Máxima que dura hasta <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seg, y <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> de Resistencia Mágica.<br>",
      "effects": {
          "Armor": 40,
          "HealthThreshold": 40,
          "Mana": 30,
          "ShieldDuration": 10,
          "ShieldHealthPercent": 50,
          "Stats": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/fimbulwinter_radiant.png",
      "name": "Juramento del Bastión"
  },
  {
      "apiName": "TFT5_Item_BlueBuffRadiant",
      "desc": "El Maná Máximo se reduce en @ManaReduction@. <br><br>Cuando el portador logra un derribo, inflige un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de daño adicional durante <TFTRadiantItemBonus>@TakedownTimer@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules><br><br>",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "DamageAmp": 0.20000000298023224,
          "Mana": 20,
          "ManaReduction": 10,
          "TakedownTimer": 12
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/blue_buff_radiant.png",
      "name": "Bendición Azul"
  },
  {
      "apiName": "TFT5_Item_ArchangelsStaffRadiant",
      "desc": "Inicio del combate: Obtiene <TFTRadiantItemBonus>@APPerInterval@</TFTRadiantItemBonus> de Poder de Habilidad cada <TFTRadiantItemBonus>@IntervalSeconds@</TFTRadiantItemBonus> seg en combate.",
      "effects": {
          "AP": 50,
          "APPerInterval": 40,
          "IntervalSeconds": 4,
          "Mana": 15
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/archangel_staff_radiant.png",
      "name": "Báculo del Urfángel"
  },
  {
      "apiName": "TFT5_Item_MorellonomiconRadiant",
      "desc": "Los ataques y las habilidades <TFTKeyword>Queman</TFTKeyword> por un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hieren</TFTKeyword> por un @GrievousWoundsPercent@% a los enemigos durante <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: Reduce las curaciones recibidas</tftitemrules>",
      "effects": {
          "AP": 50,
          "AS": 25,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 150,
          "MonsterCap": 150,
          "TicksPerSecond": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/morellonomicon_radiant.png",
      "name": "Morelluminomicón"
  },
  {
      "apiName": "TFT5_Item_BrambleVestRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> de Vida Máxima.<br><br>Recibe un <TFTRadiantItemBonus>@AutoDamageReduction*100@%</TFTRadiantItemBonus> de daño reducido de los ataques. Cuando recibe un ataque, inflige <TFTRadiantItemBonus>@1StarAoEDamage@</TFTRadiantItemBonus> de daño mágico a los enemigos adyacentes.<br><br><tftitemrules>Enfriamiento: @ICD@ seg</tftitemrules>",
      "effects": {
          "1StarAoEDamage": 175,
          "2StarAoEDamage": 175,
          "3StarAoEDamage": 175,
          "Armor": 100,
          "AutoDamageReduction": 0.25,
          "ICD": 2,
          "PercentMaxHP": 0.07999999821186066,
          "{b5c2a66b}": 175
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/bramble_vest_radiant.png",
      "name": "Vesta Espinas de Rosa"
  },
  {
      "apiName": "TFT5_Item_ZzRotPortalRadiant",
      "desc": "Invoca un gran Engendro del Vacío. Su fuerza aumenta en cada fase.<br><br>​​<tftitemrules>[Objeto soporte]<br>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "Health": 150,
          "SummonedStatReduction": 25,
          "{50a0dbb5}": 1,
          "{ef0bb7c2}": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft9_supportitems/zzrot_portal.png",
      "name": "Portal Zz'Rot"
  },
  {
      "apiName": "TFT5_Item_ShroudOfStillnessRadiant",
      "desc": "Inicio del combate: Dispara un <TFTRadiantItemBonus>rayo más ancho</TFTRadiantItemBonus> que <TFTKeyword>Saquea Maná</TFTKeyword> por un <TFTRadiantItemBonus>@CostIncrease@%</TFTRadiantItemBonus> a los enemigos.<br><TFTRadiantItemBonus>Tu equipo obtiene un %i:scaleMana% @AllyBonusMana@ de Maná inicial.</TFTRadiantItemBonus><br><br><tftitemrules>[Único: solo 1 por campeón]<br><tftbold>Saqueo de Maná</tftbold>: Aumenta el maná máximo hasta el próximo lanzamiento.</tftitemrules><br>",
      "effects": {
          "AllyBonusMana": 25,
          "Armor": 20,
          "CostIncrease": 50,
          "CritChance": 20,
          "Health": 400,
          "{4516a18d}": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/shroud_of_stillness_radiant.png",
      "name": "Manto de Reverencia"
  },
  {
      "apiName": "TFT5_Item_RunaansHurricaneRadiant",
      "desc": "Los ataques disparan un proyectil a un enemigo cercano, lo que inflige un <TFTRadiantItemBonus>@MultiplierForDamage@%</TFTRadiantItemBonus> de Daño de Ataque %i:scaleAD% como daño físico.<br>",
      "effects": {
          "AD": 0.3499999940395355,
          "AS": 20,
          "AdditionalTargets": 1,
          "MagicResist": 20,
          "MultiplierForDamage": 110
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/runaans_hurricane_radiant.png",
      "name": "Tempestad de Runaan"
  },
  {
      "apiName": "TFT5_Item_ZephyrRadiant",
      "desc": "Inicio del combate: Invoca un remolino en el lado opuesto de la arena que elimina del combate al enemigo más cercano durante <TFTRadiantItemBonus>@BanishDuration@</TFTRadiantItemBonus> seg.<br><TFTRadiantItemBonus>Tu equipo obtiene un %i:scaleAS% @AllyBonusAS@% de Velocidad de Ataque.</TFTRadiantItemBonus><br><br><tftitemrules>[Ignora las inmunidades de control de masas].<br>[Único: solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AS": 20,
          "AllyBonusAS": 15,
          "BanishDuration": 8,
          "Health": 300,
          "MagicResist": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/zephyr_radiant.png",
      "name": "Mistral"
  },
  {
      "apiName": "TFT5_Item_GuinsoosRagebladeRadiant",
      "desc": "Los ataques otorgan un <TFTRadiantItemBonus>@AttackSpeedPerStack@%</TFTRadiantItemBonus> de Velocidad de Ataque acumulable.",
      "effects": {
          "AP": 10,
          "AS": 20,
          "AttackSpeedPerStack": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/guinsoos_rageblade_radiant.png",
      "name": "Juicio Final de Guinsoo"
  },
  {
      "apiName": "TFT5_Item_HandOfJusticeRadiant",
      "desc": "Obtienes 2 efectos:<li><TFTRadiantItemBonus>@ADBuff*100@%</TFTRadiantItemBonus> de Daño de Ataque y <TFTRadiantItemBonus>@APBuff@</TFTRadiantItemBonus> de Poder de Habilidad.<li><TFTRadiantItemBonus>@Omnivamp*100@%</TFTRadiantItemBonus> de Omnivampirismo",
      "effects": {
          "ADBuff": 0.5,
          "APBuff": 50,
          "CritChance": 40,
          "Mana": 15,
          "Omnivamp": 0.30000001192092896,
          "TraitMultiplier": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/hand_of_justice_radiant.png",
      "name": "Puño de la Equidad"
  },
  {
      "apiName": "TFT5_Item_SunfireCapeRadiant",
      "desc": "Cada <TFTRadiantItemBonus>@ICD@</TFTRadiantItemBonus> seg, <TFTKeyword>Quema</TFTKeyword> por un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hiere</TFTKeyword> por un @GrievousWoundsPercent@% a un enemigo en un radio de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos durante <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seg.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: reduce las curaciones recibidas</tftitemrules>",
      "effects": {
          "Armor": 20,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 300,
          "HealthRegenInterval": "null",
          "HexRange": 3,
          "ICD": 1.5,
          "MaxHealthRegen": "null",
          "MonsterCap": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/sunfire_cape_radiant.png",
      "name": "Capa de Luz Solar"
  },
  {
      "apiName": "TFT5_Item_ZekesHeraldRadiant",
      "desc": "Inicio del combate: Otorga un %i:scaleAS% <TFTRadiantItemBonus>@AttackSpeed@%</TFTRadiantItemBonus> de Velocidad de Ataque y un <TFTRadiantItemBonus>@Lifesteal@% de</TFTRadiantItemBonus> <TFTKeyword>Omnivampirismo</TFTKeyword> al portador y a los aliados dentro de 1 hexágono en la misma fila.<br><br> <tftitemrules><tftbold>Omnivampirismo</tftbold>: Se cura un porcentaje del daño infligido</tftitemrules>",
      "effects": {
          "AD": 0.3499999940395355,
          "AttackSpeed": 35,
          "Health": 350,
          "HexRange": 1,
          "LifeSteal": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/zekes_herald_radiant.png",
      "name": "Armonía de Zeke"
  },
  {
      "apiName": "TFT5_Item_LastWhisperRadiant",
      "desc": "El daño físico infligido aplica un @ArmorReductionPercent@% de <TFTKeyword>desgarre</TFTKeyword> al objetivo por <TFTRadiantItemBonus>el resto del combate.</TFTRadiantItemBonus> Este efecto no se acumula.<br><br><tftitemrules>[Único: Solo 1 por campeón]<br><tftbold>Desgarre</tftbold>: Reduce la armadura</tftitemrules>",
      "effects": {
          "AD": 0.44999998807907104,
          "AS": 25,
          "ArmorBreakDuration": 50,
          "ArmorReductionPercent": 30,
          "CritChance": 55
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/last_whisper_radiant.png",
      "name": "Suspiro Eterno"
  },
  {
      "apiName": "TFT5_Item_LocketOfTheIronSolariRadiant",
      "desc": "Inicio del combate: Escuda al portador y a los aliados dentro de <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexágonos en la misma fila por <TFTRadiantItemBonus>@1StarShieldValue@/@2StarShieldValue@/@3StarShieldValue@</TFTRadiantItemBonus> %i:star% de daño durante <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seg.<br><TFTRadiantItemBonus>Tu equipo obtiene %i:scaleHealth% @BonusAllyHealth@ de Vida.</TFTRadiantItemBonus>",
      "effects": {
          "1StarShieldValue": 275,
          "2StarShieldValue": 325,
          "3StarShieldValue": 375,
          "AP": 10,
          "Armor": 20,
          "BonusAllyHealth": 200,
          "HexRange": 3,
          "ShieldDuration": 60,
          "{c78af25f}": 425
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/locket_of_the_iron_solari_radiant.png",
      "name": "Relicario del Targón Primigenio"
  },
  {
      "apiName": "TFT5_Item_ThiefsGlovesRadiant",
      "desc": "Cada ronda: Equipa 2 objetos <TFTRadiantItemBonus>Radiantes</TFTRadiantItemBonus> aleatorios.<br><br><tftitemrules>[Consume 3 espacios de objeto].</tftitemrules>",
      "effects": {
          "CritChance": 20,
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/thieves_gloves_radiant.png",
      "name": "Guantes de Bribón"
  },
  {
      "apiName": "TFT5_Item_WarmogsArmorRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@BonusPercentHP*100@%</TFTRadiantItemBonus> de Vida máxima.<br><br><TFTRadiantItemBonus>Cura un @MaxHealthRegen@% de la Vida Máxima por seg.</TFTRadiantItemBonus>",
      "effects": {
          "BonusPercentHP": 0.20000000298023224,
          "Health": 1000,
          "HealthRegenInterval": 1,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/warmogs_armor_radiant.png",
      "name": "Orgullo de Warmog"
  },
  {
      "apiName": "TFT5_Item_SteraksGageRadiant",
      "desc": "Una vez por combate, al tener un @HealthThreshold@% de Vida, obtiene un <TFTRadiantItemBonus>@BonusMaxHealthPerc@% de Vida Máxima</TFTRadiantItemBonus> y <TFTRadiantItemBonus>@BonusADToGive@% de Daño de Ataque</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.30000001192092896,
          "BonusADToGive": 60,
          "BonusMaxHealthPerc": 40,
          "Health": 400,
          "HealthThreshold": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/steraks_gage_radiant.png",
      "name": "Megaescudo de Sterak"
  },
  {
      "apiName": "TFT5_Item_RedemptionRadiant",
      "desc": "Cura a los aliados dentro de <TFTRadiantItemBonus>@HexRadius@</TFTRadiantItemBonus> hexágonos por un <TFTRadiantItemBonus>@MissingHealthHeal@%</TFTRadiantItemBonus> de su Vida faltante cada @HealTickRate@ seg. Además, obtienen un @AoEDamageReduction@% de Durabilidad por @HealTickRate@ seg (no se acumula).<br><br><TFTTrackerLabel>Curación:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AoEDamageReduction": 10,
          "HealTickRate": 5,
          "Health": 400,
          "HexRadius": 2,
          "Mana": 15,
          "MaxHeal": 2000,
          "MissingHealthHeal": 25
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/redemption_radiant.png",
      "name": "Absolución"
  },
  {
      "apiName": "TFT5_Item_GuardianAngelRadiant",
      "desc": "Una vez por combate: Al tener un @HealthThreshold@% de Vida, se vuelve inalcanzable por un tiempo breve y elimina los efectos negativos. Luego, se <TFTRadiantItemBonus>cura un @MissingHealthRestore*100@% de su Vida faltante y obtiene un @AttackSpeed@% de Velocidad de Ataque adicional</TFTRadiantItemBonus>. <br><br><tftitemrules>[Único: Solo 1 por campeón]</tftitemrules>",
      "effects": {
          "AD": 0.30000001192092896,
          "Armor": 30,
          "AttackSpeed": 85,
          "DamageReduction": 100,
          "HealthThreshold": 60,
          "HealthThreshold2": 30,
          "MissingHealthRestore": 1,
          "StealthDuration": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/edge_of_night_radiant.png",
      "name": "Umbral del amanecer"
  },
  {
      "apiName": "TFT5_Item_RapidFirecannonRadiant",
      "desc": "Los ataques y las habilidades <TFTKeyword>Queman</TFTKeyword> un <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> y <TFTKeyword>Hieren</TFTKeyword> un <TFTRadiantItemBonus>@HealingReductionPct@%</TFTRadiantItemBonus> a los enemigos durante @Duration@ seg.<br><br><tftitemrules><tftbold>Quemadura</tftbold>: Inflige un porcentaje de la Vida máxima del objetivo como daño verdadero cada seg<br><tftbold>Herida</tftbold>: Reduce las curaciones recibidas</tftitemrules><br>",
      "effects": {
          "AS": 60,
          "BonusDamage": 0.10000000149011612,
          "BurnPercent": 2,
          "Duration": 5,
          "HealingReductionPct": 33,
          "HexRangeIncrease": 2,
          "{1543aa48}": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/redbuff_radiant.png",
      "name": "Blasón de Cenizas"
  },
  {
      "apiName": "TFT5_Item_NightHarvesterRadiant",
      "desc": "Obtienes un <TFTRadiantItemBonus>@BaseDurability*100@%</TFTRadiantItemBonus> de Durabilidad. Si tienes más de un <TFTRadiantItemBonus>@ThresholdForEmpower*100@%</TFTRadiantItemBonus> de Vida, obtienes un <TFTRadiantItemBonus>@EmpoweredDurability*100@%</TFTRadiantItemBonus> de Durabilidad.",
      "effects": {
          "Armor": 40,
          "BaseDamageReduction": 16,
          "BaseDurability": 0.1599999964237213,
          "CritChance": 20,
          "EmpowerDamageReduction": 30,
          "EmpoweredDurability": 0.30000001192092896,
          "Health": 500,
          "ThresholdForEmpower": 0.4000000059604645
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/behemoth_radiant.png",
      "name": "Legado del Coloso"
  },
  {
      "apiName": "TFT5_Item_TitansResolveRadiant",
      "desc": "Obtiene un <TFTRadiantItemBonus>@StackingAD*100@%</TFTRadiantItemBonus> de Daño de Ataque y <TFTRadiantItemBonus>@StackingSP@</TFTRadiantItemBonus> de Poder de Habilidad al atacar o recibir daño, lo que se acumula hasta @StackCap@ veces.<br><br>Al tener el máximo de acumulaciones, obtiene <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> de Resistencia Mágica.",
      "effects": {
          "AS": 30,
          "Armor": 35,
          "BonusResistsAtStackCap": 50,
          "StackCap": 25,
          "StackingAD": 0.029999999329447746,
          "StackingSP": 3
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/titans_resolve_radiant.png",
      "name": "Juramento del Titán"
  },
  {
      "apiName": "TFT5_Item_GiantSlayerRadiant",
      "desc": "Obtienes un <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> de Amplificación de daño contra enemigos con más de @HealthThreshold@ de Vida máxima.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AS": 10,
          "DamageAmp": 0.4000000059604645,
          "HealthThreshold": 1750,
          "LargeBonusPct": 60
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/giant_slayer_radiant.png",
      "name": "Verdugo de Demonios"
  },
  {
      "apiName": "TFT5_Item_CrownguardRadiant",
      "desc": "Inicio del combate: Obtiene un escudo equivalente al <TFTRadiantItemBonus>@ShieldSize@%</TFTRadiantItemBonus> de su Vida Máxima durante @ShieldDuration@ seg. <br>Cuando el escudo desaparece, obtiene <TFTRadiantItemBonus>@ShieldBonusAP@ de Poder de Habilidad</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 40,
          "Armor": 40,
          "ChillDuration": 4,
          "Health": 200,
          "HexRange": 5,
          "ShieldBonusAP": 50,
          "ShieldDuration": 8,
          "ShieldSize": 50
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/crownguard_radiant.png",
      "name": "Escudo de la Corona Real"
  },
  {
      "apiName": "TFT5_Item_BloodthirsterRadiant",
      "desc": "Una vez por combate: Al tener un @HealthThreshold@% de Vida, obtienes un Escudo con un <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> de la Vida Máxima que dura hasta @ShieldDuration@ seg.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "HealthThreshold": 40,
          "LifeSteal": 40,
          "MagicResist": 20,
          "ShieldDuration": 5,
          "ShieldHealthPercent": 40,
          "StatOmnivamp": 0.4000000059604645
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/bloodthirster_radiant.png",
      "name": "La Sanguinaria Bendecida"
  },
  {
      "apiName": "TFT5_Item_RabadonsDeathcapRadiant",
      "desc": "",
      "effects": {
          "AP": 70,
          "BonusDamage": 0.5,
          "{1543aa48}": 0.33000001311302185
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/rabadons_deathcap_radiant.png",
      "name": "Sombrero Mortiascendido de Rabadon"
  },
  {
      "apiName": "TFT5_Item_JeweledGauntletRadiant",
      "desc": "Las habilidades pueden infligir golpes críticos.<br><br>Si las habilidades del portador ya pueden infligir golpes críticos, obtienen un @CritDamageToGive*100@% de daño de Golpe Crítico.",
      "effects": {
          "AP": 55,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/jeweled_gauntlet_radiant.png",
      "name": "Guantelete Glamoroso"
  },
  {
      "apiName": "TFT5_Item_GargoyleStoneplateRadiant",
      "desc": "Obtiene <TFTRadiantItemBonus>@ArmorPerEnemy@</TFTRadiantItemBonus> de Armadura y <TFTRadiantItemBonus>@MRPerEnemy@</TFTRadiantItemBonus> de Resistencia Mágica por cada enemigo que tenga al portador como objetivo.<br><br><TFTRadiantItemBonus>Además, se cura un @MaxHealthRegen@% de Vida Máxima cada seg.</TFTRadiantItemBonus>",
      "effects": {
          "Armor": 50,
          "ArmorPerEnemy": 15,
          "Health": 250,
          "HealthRegenInterval": 1,
          "MRPerEnemy": 15,
          "MagicResist": 50,
          "MaxHealthRegen": 1.5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/gargoyle_stoneplate_radiant.png",
      "name": "Armadura Pétrea de Dvarapala"
  },
  {
      "apiName": "TFT5_Item_ChaliceOfPowerRadiant",
      "desc": "Inicio del combate: Otorga %i:scaleAP% <TFTRadiantItemBonus>@ChaliceAP@</TFTRadiantItemBonus> de Poder de Habilidad <TFTRadiantItemBonus>y un @Spellvamp@% de <TFTKeyword>Omnivampirismo</TFTKeyword></TFTRadiantItemBonus> al portador y a los aliados dentro de 1 hexágono en la misma fila.<br><br>​​<tftitemrules><tftbold>Omnivampirismo</tftbold>: Se cura un porcentaje del daño infligido</tftitemrules>",
      "effects": {
          "ChaliceAP": 45,
          "HexRange": 1,
          "MagicResist": 45,
          "Mana": 45,
          "Spellvamp": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/chalice_of_power_radiant.png",
      "name": "Cáliz de Caridad"
  },
  {
      "apiName": "TFT5_Item_LeviathanRadiant",
      "desc": "Después de lanzar una habilidad, obtiene un <TFTRadiantItemBonus>@AttackSpeedToGive@% de Velocidad de Ataque</TFTRadiantItemBonus> durante <TFTRadiantItemBonus>@ASDuration@ seg</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 30,
          "AS": 20,
          "ASDuration": 8,
          "AttackSpeedToGive": 120,
          "Health": 200
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/nashors_tooth_radiant.png",
      "name": "Regalo del Barón"
  },
  {
      "apiName": "TFT5_Item_SpearOfShojinRadiant",
      "desc": "Los ataques otorgan <TFTRadiantItemBonus>@FlatManaRestore@ de Maná adicional</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.3499999940395355,
          "AP": 35,
          "FlatManaRestore": 10,
          "Mana": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/spear_of_shojin_radiant.png",
      "name": "Lanza de Hirana"
  },
  {
      "apiName": "TFT5_Item_SpectralGauntletRadiant",
      "desc": "<TFTKeyword>Desgarra</TFTKeyword> por un @ARReductionAmount@% a los enemigos en los @HexRange@ hexágonos circundantes. Obtiene <TFTRadiantItemBonus> @BonusResists@ de Armadura y Resistencia Mágica</TFTRadiantItemBonus> durante los primeros <TFTRadiantItemBonus>@BonusResistDuration@ seg</TFTRadiantItemBonus> del combate.<br><br><tftitemrules><tftbold>Desgarre</tftbold>: Reduce la armadura</tftitemrules>",
      "effects": {
          "ARReductionAmount": 30,
          "BonusResistDuration": 15,
          "BonusResists": 50,
          "Health": 500,
          "HexRange": 3,
          "MagicResist": 30
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/evenshroud_radiant.png",
      "name": "Equinoccio"
  },
  {
      "apiName": "TFT5_Item_InfinityEdgeRadiant",
      "desc": "Las habilidades pueden infligir golpes críticos.<br><br>Si las habilidades del portador ya pueden infligir golpes críticos, obtienen un @CritDamageToGive*100@% de daño de Golpe Crítico.",
      "effects": {
          "AD": 0.6499999761581421,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/infinity_edge_radiant.png",
      "name": "Filo del Cénit"
  },
  {
      "apiName": "TFT5_Item_DeathbladeRadiant",
      "desc": "",
      "effects": {
          "AD": 1.0499999523162842,
          "BonusDamage": 0.11999999731779099,
          "{1543aa48}": 0.11999999731779099
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/death_blade_radiant.png",
      "name": "Filo de la Muerte Luminoso"
  },
  {
      "apiName": "TFT5_Item_AdaptiveHelmRadiant",
      "desc": "Inicio del combate: Obtienes efectos adicionales según tu posición inicial.<br><br>Primeras dos filas: <TFTRadiantItemBonus>@FrontRowBonusResists@</TFTRadiantItemBonus> de Armadura y Resistencia Mágica. Obtienes <TFTRadiantItemBonus>@FrontLineManaPerHit@</TFTRadiantItemBonus> de Maná al ser impactado por un ataque.<br><br>Dos filas traseras: <TFTRadiantItemBonus>@BackRowBonusAP@</TFTRadiantItemBonus> de Poder de Habilidad. Obtienes <TFTRadiantItemBonus>@ManaPerTickrate@</TFTRadiantItemBonus> de Maná cada @ManaTickrate@ seg.<br>",
      "effects": {
          "AP": 25,
          "BackRowBonusAP": 30,
          "FrontLineManaPerHit": 2,
          "FrontRowBonusResists": 60,
          "MagicResist": 30,
          "Mana": 15,
          "ManaPerTickrate": 20,
          "ManaTickrate": 3,
          "TotalAPBonus": 40
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/radiant/adaptive_helm_radiant.png",
      "name": "Jak'Sho, el Proteico"
  },
  {
      "apiName": "TFT_Assist_RandomRadiantItem",
      "desc": "Objeto Radiante",
      "effects": {},
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/pairs/doubleup_assistarmory_randomitem_radiant.png",
      "name": "Objeto Radiante"
  },
  {
      "apiName": "TFT12_Item_Faerie_QueensCrownRadiant",
      "desc": "Tras infligir daño @MaxNumStacks@ veces, obtienes un <TFTRadiantItemBonus>@TFTUnitProperty.item:TFT12_Faerie_DamageAmp@%</TFTRadiantItemBonus> de %i:scaleDA% por el resto del combate.<br><br><TFTRadiantItemBonus>Tras infligir daño @RadiantMaxStacks@ veces, obtienes un @RadiantMaxHealth*100@% de Vida Máxima, un @RadiantOmnivamp*100@% de Omnivampirismo y un @RadiantDamageAmp*100@% de Amplificación de daño.</TFTRadiantItemBonus><br><br><tftitemrules>Solo las Hadas pueden tener este objeto.</tftitemrules><br><tftitemrules>Manda al campeón a la banca para quitarlo.</tftitemrules>",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "AS": 0.25,
          "MaxNumStacks": 12,
          "RadiantDamageAmp": 0.5,
          "RadiantMaxHealth": 0.20000000298023224,
          "RadiantMaxStacks": 25,
          "RadiantOmnivamp": 0.30000001192092896
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriecrown_radiant.tft_set12.png",
      "name": "Corona del Monarca Eterno"
  },
  {
      "apiName": "TFT12_Item_Faerie_ArmorRadiant",
      "desc": "Obtienes un <TFTRadiantItemBonus>@HealShieldPower*100@%</TFTRadiantItemBonus> de curaciones y escudos aumentados. Cura un <TFTRadiantItemBonus>@QueenHealRatio*100@%</TFTRadiantItemBonus> del daño infligido por la Reina.<br><br><tftitemrules>Solo las Hadas pueden tener este objeto.</tftitemrules><br><tftitemrules>Manda al campeón a la banca para quitarlo.</tftitemrules>",
      "effects": {
          "Armor": 60,
          "HealShieldPower": 0.6000000238418579,
          "Health": 1000,
          "MagicResist": 60,
          "QueenHealRatio": 0.25
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriequeenguardarmor_radiant.tft_set12.png",
      "name": "Armadura de Devoción Eterna"
  },
  {
      "apiName": "TFT_Item_RadiantVirtue",
      "desc": "Cura a todos los aliados por un @MaxHealthHeal@% de su Vida Máxima cada @HealTickRate@ seg. Al morir el portador, la curación aumenta a un @TOOLTIPEmpoweredHeal@% de la Vida máxima por @NumBonusHeals@ curaciones adicionales.<br><br><TFTTrackerLabel>Curación:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight><br><br> <tftitemrules>[Objeto soporte]</tftitemrules>",
      "effects": {
          "HealTickRate": 5,
          "Health": 150,
          "MaxHeal": 1000,
          "MaxHealthHeal": 7,
          "NumBonusHeals": 2,
          "PostDeathDuration": 15,
          "TOOLTIPEmpoweredHeal": 14,
          "{484836f3}": 200
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft9_supportitems/radiant_virtue.png",
      "name": "Virtud del Mártir"
  },
  {
      "apiName": "TFT11_Augment_RadiantRefactor",
      "desc": "Obtienes una Mejora de Maestro Artesano y @anvils@ yunque(s) de componentes.<br><br><rules>¡La Mejora de Maestro Artesano mejora un objeto a Radiante!</rules>",
      "effects": {
          "anvils": 1
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/radiantrefactor_iii.png",
      "name": "Refactorización Radiante"
  },
  {
      "apiName": "TFT9_Augment_PandorasRadiantBox",
      "desc": "Inicio de la ronda: Los objetos de tu banca se eligen al azar. <br><br>Obtienes 1 objeto Radiante aleatorio.",
      "effects": {},
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandora3.png",
      "name": "Objetos de Pandora III"
  },
  {
      "apiName": "TFT6_Augment_RadiantRelics",
      "desc": "Elige 1 de @ArmoryChoiceCount@ Objetos Radiantes. Obtienes un Limpiador Magnético.<br><br><rules>Los Objetos Radiantes son versiones muy poderosas de los objetos completados.</rules>",
      "effects": {
          "ArmoryChoiceCount": 5
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/radiantrelic-iii.png",
      "name": "Reliquias Radiantes"
  },
  {
      "apiName": "TFT9_Augment_Legend_PandorasRadiantBox",
      "desc": "Inicio de la ronda: Los objetos de tu banca se eligen al azar. <br><br>Obtienes 1 objeto Radiante aleatorio.",
      "effects": {},
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandora3.png",
      "name": "Objetos de Pandora III"
  }
]

export const emblems = [
  
  {
      "apiName": "TFT12_Item_BlasterEmblemItem",
      "desc": "El portador obtiene el rasgo Pistolero.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_artillerist.png",
      "name": "Emblema de Pistolero",
      "sinergia": "Blaster"
  },
  {
      "apiName": "TFT12_Item_VanguardEmblemItem",
      "desc": "El portador obtiene el rasgo Vanguardia.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_vanguard.png",
      "name": "Emblema de Vanguardia",
      "sinergia": "Vanguard"
  },
  {
      "apiName": "TFT12_Item_ScholarEmblemItem",
      "desc": "El portador obtiene el rasgo Erudito.",
      "effects": {
          "Mana": 15
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_scholar.png",
      "name": "Emblema de Erudito",
      "sinergia": "Scholar"
  },
  {
      "apiName": "TFT12_Item_ChronoEmblemItem",
      "desc": "El portador obtiene el rasgo Crono.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_chrono.png",
      "name": "Emblema de Crono",
      "sinergia": "Chrono"
  },
  {
      "apiName": "TFT12_Item_PreserverEmblemItem",
      "desc": "El portador obtiene el rasgo Preservador.",
      "effects": {
          "MagicResist": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_preserver.png",
      "name": "Emblema de Preservador",
      "sinergia": "Preserver"
  },
  {
      "apiName": "TFT12_Item_ArcanaEmblemItem",
      "desc": "El portador obtiene el rasgo Arcana.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_arcana.png",
      "name": "Emblema de Arcana",
      "sinergia": "Arcana"
  },
  {
      "apiName": "TFT12_Item_MageEmblemItem",
      "desc": "El portador obtiene el rasgo Mago.",
      "effects": {
          "AP": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_mage.png",
      "name": "Emblema de Mago",
      "sinergia": "Mage"
  },
  {
      "apiName": "TFT12_Item_BastionEmblemItem",
      "desc": "El portador obtiene el rasgo Bastión.",
      "effects": {
          "Armor": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_bastion.png",
      "name": "Emblema de Bastión",
      "sinergia": "Bastion"
  },
  {
      "apiName": "TFT12_Item_WarriorEmblemItem",
      "desc": "El portador obtiene el rasgo Guerrero.",
      "effects": {
          "CritChance": 20
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_warrior.png",
      "name": "Emblema de Guerreros",
      "sinergia": "Warrior"
  },
  {
      "apiName": "TFT12_Item_IncantorEmblemItem",
      "desc": "El portador obtiene el rasgo Incantum.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_incantor.png",
      "name": "Emblema de Incantum",
      "sinergia": "Incantor"
  },
  {
      "apiName": "TFT12_Item_MultistrikerEmblemItem",
      "desc": "El portador obtiene el rasgo Multiatacante.",
      "effects": {
          "AS": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_multistriker.png",
      "name": "Emblema de Multiatacante",
      "sinergia": "Multistriker"
  },
  {
      "apiName": "TFT12_Item_ShapeshifterEmblemItem",
      "desc": "El portador obtiene el rasgo Cambiaformas.",
      "effects": {
          "Health": 150
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_shapeshifter.png",
      "name": "Emblema de Cambiaformas",
      "sinergia": "Shapeshifter"
  },
  {
      "apiName": "TFT12_Item_HunterEmblemItem",
      "desc": "El portador obtiene el rasgo Cazador.",
      "effects": {
          "AD": 0.10000000149011612
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_hunter.png",
      "name": "Emblema de Cazador",
      "sinergia": "Hunter"
  },
  {
      "apiName": "TFT12_Item_PortalEmblemItem",
      "desc": "El portador obtiene el rasgo Portal.",
      "effects": {
          "AP": 10
      },
      "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_portal.png",
      "name": "Emblema de Portal",
      "sinergia": "Portal"
  },
  {
    "apiName": "TFT12_Item_SugarcraftEmblemItem",
    "desc": "El portador obtiene el rasgo Glucomancia.",
    "effects": {
        "AD": 0.10000000149011612
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_sugarcraft.png",
    "name": "Emblema de Glucomancia",
    "sinergia": "Sugarcraft"
},
{
    "apiName": "TFT12_Item_HoneymancyEmblemItem",
    "desc": "El portador obtiene el rasgo Melimancia.",
    "effects": {
        "CritChance": 20
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_honeymancy.png",
    "name": "Emblema de Melimancia",
    "sinergia": "Honeymancy"
},
{
    "apiName": "TFT12_Item_FrostEmblemItem",
    "desc": "El portador obtiene el rasgo Escarcha.",
    "effects": {
        "Armor": 20
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_frost.png",
    "name": "Emblema de Escarcha",
    "sinergia": "Frost"
},
{
    "apiName": "TFT12_Item_WitchcraftEmblemItem",
    "desc": "El portador obtiene el rasgo Brujería.",
    "effects": {
        "MagicResist": 20,
        "{71199abe}": 3
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_witchcraft.png",
    "name": "Emblema de Brujería",
    "sinergia": "Witchcraft"
},
{
    "apiName": "TFT12_Item_EldritchEmblemItem",
    "desc": "El portador obtiene el rasgo Sobrenatural.",
    "effects": {
        "Health": 150
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_eldritch.png",
    "name": "Emblema Sobrenatural",
    "sinergia": "Eldritch"
},
{
    "apiName": "TFT12_Item_PyroEmblemItem",
    "desc": "El portador obtiene el rasgo Piromancia.",
    "effects": {
        "AS": 10
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_pyro.png",
    "name": "Emblema de Piromancia",
    "sinergia": "Pyro"
},
{
    "apiName": "TFT12_Item_FaerieEmblemItem",
    "desc": "El portador obtiene el rasgo Feérico.",
    "effects": {
        "Mana": 15
    },
    "img": "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_faerie.png",
    "name": "Emblema Feérico",
    "sinergia": "Faerie"
},

]

export const augmentsIDList = [
  "TFT12_Augment_ShenCarry",
  "TFT12_Augment_Dragon",
  "TFT10_Augment_BigGains",
  "TFT10_Augment_CrashTestDummies",
  "TFT10_Augment_CrownGuarded",
  "TFT10_Augment_GoingLong",
  "TFT10_Augment_GoodForSomethingSilver",
  "TFT10_Augment_HelpIsOnTheWay",
  "TFT10_Augment_HeroicGrabBag",
  "TFT10_Augment_InspiringEpitaph",
  "TFT10_Augment_LearningToSpell",
  "TFT10_Augment_LittleBuddies",
  "TFT10_Augment_Scapegoat",
  "TFT10_Augment_SilverVeil",
  "TFT10_Augment_Stimpack",
  "TFT11_Augment_AtWhatCost",
  "TFT11_Augment_BloodBank",
  "TFT11_Augment_Buildabud",
  "TFT11_Augment_Calltochaos",
  "TFT11_Augment_DragonSpirit",
  "TFT11_Augment_Epoch",
  "TFT11_Augment_EpochPlus",
  "TFT11_Augment_FineVintage",
  "TFT11_Augment_GoldenRemover",
  "TFT11_Augment_OverEncumbered",
  "TFT11_Augment_Prizefighter",
  "TFT11_Augment_RadiantRefactor",
  "TFT11_Augment_RainingGold",
  "TFT11_Augment_RainingGoldPlus",
  "TFT11_Augment_Reinfourcement",
  "TFT11_Augment_ScoreboardScrapper",
  "TFT11_Augment_Slammin",
  "TFT11_Augment_Slammin_Plus",
  "TFT11_Augment_TinyButDeadly",
  "TFT11_Augment_WanderingTrainerGold",
  "TFT12_Augment_ArcanaCrest",
  "TFT12_Augment_ArcanaCrown",
  "TFT12_Augment_Bastion",
  "TFT12_Augment_BastionCrest",
  "TFT12_Augment_BastionCrown",
  "TFT12_Augment_BlasterCrest",
  "TFT12_Augment_BlasterCrown",
  "TFT12_Augment_BlitzcrankCarry",
  "TFT12_Augment_Chrono",
  "TFT12_Augment_ChronoCrest",
  "TFT12_Augment_ChronoCrown",
  "TFT12_Augment_Eldritch",
  "TFT12_Augment_EldritchCrest",
  "TFT12_Augment_EldritchCrown",
  "TFT12_Augment_EliseCarry",
  "TFT12_Augment_Faerie",
  "TFT12_Augment_FaerieCrest",
  "TFT12_Augment_FaerieCrown",
  "TFT12_Augment_Frost",
  "TFT12_Augment_FrostCrest",
  "TFT12_Augment_FrostCrown",
  "TFT12_Augment_GalioCarry",
  "TFT12_Augment_GalioCarryPlus",
  "TFT12_Augment_Honeymancy",
  "TFT12_Augment_HoneymancyCrest",
  "TFT12_Augment_HoneymancyCrown",
  "TFT12_Augment_Hunter",
  "TFT12_Augment_HunterCrest",
  "TFT12_Augment_HunterCrown",
  "TFT12_Augment_Incantor",
  "TFT12_Augment_IncantorCrest",
  "TFT12_Augment_IncantorCrown",
  "TFT12_Augment_LilliaCarry",
  "TFT12_Augment_Mage",
  "TFT12_Augment_MageCrest",
  "TFT12_Augment_MageCrown",
  "TFT12_Augment_Multistriker",
  "TFT12_Augment_MultistrikerCrest",
  "TFT12_Augment_MultistrikerCrown",
  "TFT12_Augment_NunuCarry",
  "TFT12_Augment_NunuCarryPlus",
  "TFT12_Augment_PoppyCarry",
  "TFT12_Augment_PortalCrest",
  "TFT12_Augment_PortalCrown",
  "TFT12_Augment_Preserver",
  "TFT12_Augment_PreserverCrest",
  "TFT12_Augment_PreserverCrown",
  "TFT12_Augment_Pyro",
  "TFT12_Augment_PyroCrest",
  "TFT12_Augment_PyroCrown",
  "TFT12_Augment_RumbleCarry",
  "TFT12_Augment_RumbleCarryPlus",
  "TFT12_Augment_Scholar",
  "TFT12_Augment_ScholarCrest",
  "TFT12_Augment_ScholarCrown",
  "TFT12_Augment_Shapeshifter",
  "TFT12_Augment_ShapeshifterCrest",
  "TFT12_Augment_ShapeshifterCrown",
  "TFT12_Augment_ShapeshifterPlus",
  "TFT12_Augment_Sugarcraft",
  "TFT12_Augment_SugarcraftCrest",
  "TFT12_Augment_SugarcraftCrown",
  "TFT12_Augment_Transfiguration",
  "TFT12_Augment_Vanguard",
  "TFT12_Augment_VanguardCrest",
  "TFT12_Augment_VanguardCrown",
  "TFT12_Augment_WarriorCrest",
  "TFT12_Augment_WarriorCrown",
  "TFT12_Augment_Witch",
  "TFT12_Augment_WitchcraftCrest",
  "TFT12_Augment_WitchcraftCrown",
  "TFT12_Augment_WukongCarry",
  "TFT6_Augment_ClearMind",
  "TFT6_Augment_Distancing",
  "TFT6_Augment_Diversify2",
  "TFT6_Augment_Featherweights1",
  "TFT6_Augment_ForceOfNature",
  "TFT6_Augment_GachaAddict",
  "TFT6_Augment_ItemGrabBag1",
  "TFT6_Augment_Keepers1",
  "TFT6_Augment_Keepers2",
  "TFT6_Augment_MaxLevel10",
  "TFT6_Augment_MetabolicAccelerator",
  "TFT6_Augment_OneTwoFive",
  "TFT6_Augment_PandorasItems",
  "TFT6_Augment_PortableForge",
  "TFT6_Augment_RadiantRelics",
  "TFT6_Augment_Recombobulator",
  "TFT6_Augment_SalvageBin",
  "TFT6_Augment_SlowAndSteady",
  "TFT6_Augment_TheGoldenEgg",
  "TFT6_Augment_ThreesCompany",
  "TFT6_Augment_TinyTitans",
  "TFT6_Augment_TradeSector",
  "TFT6_Augment_Traitless2",
  "TFT6_Augment_TriForce1",
  "TFT7_Augment_AFK",
  "TFT7_Augment_BandOfThieves1",
  "TFT7_Augment_BirthdayPresents",
  "TFT7_Augment_ClutteredMind",
  "TFT7_Augment_LategameSpecialist",
  "TFT7_Augment_LivingForge",
  "TFT7_Augment_LuckyGloves",
  "TFT7_Augment_LuckyGlovesPlus",
  "TFT7_Augment_PandorasBench",
  "TFT9_Augment_AllThatShimmers",
  "TFT9_Augment_ArmyBuilding",
  "TFT9_Augment_BalancedBudget2",
  "TFT9_Augment_BalancedBudgetPlus",
  "TFT9_Augment_BardPlaybook1",
  "TFT9_Augment_BardPlaybook2",
  "TFT9_Augment_BardPlaybook3",
  "TFT9_Augment_BigGrabBag",
  "TFT9_Augment_BlindingSpeed",
  "TFT9_Augment_BronzeTicket",
  "TFT9_Augment_BuildingACollectionPlusPlus",
  "TFT9_Augment_CapriciousForge",
  "TFT9_Augment_CombatCaster",
  "TFT9_Augment_Commander_Ascension",
  "TFT9_Augment_Commander_FinalAscension",
  "TFT9_Augment_Commander_PartialAscension",
  "TFT9_Augment_Commander_RollingForDays",
  "TFT9_Augment_Commander_TeamingUp1",
  "TFT9_Augment_Commander_TeamingUp2",
  "TFT9_Augment_CustomerIsAlwaysRight",
  "TFT9_Augment_DravenSpoilsOfWar",
  "TFT9_Augment_DravenSpoilsOfWar2",
  "TFT9_Augment_DravenSpoilsOfWar3",
  "TFT9_Augment_EscortQuest",
  "TFT9_Augment_Formation1",
  "TFT9_Augment_Formation2",
  "TFT9_Augment_HedgeFund",
  "TFT9_Augment_HighEndSector",
  "TFT9_Augment_ImpenetrableBulwark",
  "TFT9_Augment_IronAssets",
  "TFT9_Augment_LearningFromExperience2",
  "TFT9_Augment_LongDistanceRelationship2",
  "TFT9_Augment_LongTimeCrafting",
  "TFT9_Augment_Martyr",
  "TFT9_Augment_MissedConnections",
  "TFT9_Augment_NotToday",
  "TFT9_Augment_OldMansWalkingStick",
  "TFT9_Augment_OneTwosThree",
  "TFT9_Augment_PandorasItems2",
  "TFT9_Augment_PandorasRadiantBox",
  "TFT9_Augment_PhreakyFriday",
  "TFT9_Augment_PhreakyFridayPlus",
  "TFT9_Augment_PumpingUp",
  "TFT9_Augment_PumpingUp2",
  "TFT9_Augment_PumpingUp3",
  "TFT9_Augment_RedBuff",
  "TFT9_Augment_RiskyMoves",
  "TFT9_Augment_RollTheDice",
  "TFT9_Augment_SilverSpoon",
  "TFT9_Augment_Sleightofhand",
  "TFT9_Augment_StarsAreBorn",
  "TFT9_Augment_StationarySupport1",
  "TFT9_Augment_SupportCache",
  "TFT9_Augment_ThreesACrowd",
  "TFT9_Augment_TiniestTitan",
  "TFT9_Augment_TiniestTitanPlus",
  "TFT9_Augment_TwoHealthy",
  "TFT9_Augment_WanderingTrainer",
  "TFT9_Augment_WhatDoesntKillYou",
  "TFT9_Augment_WhatTheForge",
  "TFT9_Augment_YouHaveMyBow",
  "TFT9_Augment_YouHaveMySword",
  "TFT9_Augment_YoungAndWildAndFree",
  "TFT_Augment_AllThatShimmersPlus",
  "TFT_Augment_AnUpgradedJourney",
  "TFT_Augment_AssassinsToolbox",
  "TFT_Augment_AvengeTheFallen",
  "TFT_Augment_BeggarsCanBeChoosers",
  "TFT_Augment_BlossomingLotus1",
  "TFT_Augment_BlossomingLotus2",
  "TFT_Augment_BranchingOut",
  "TFT_Augment_CalledShot",
  "TFT_Augment_CategoryFive",
  "TFT_Augment_ClockworkAccelerator",
  "TFT_Augment_DarkAlleyDealings",
  "TFT_Augment_DawnbringersBlessing1",
  "TFT_Augment_DawnbringersBlessing2",
  "TFT_Augment_DoubleDown",
  "TFT_Augment_DualPurpose",
  "TFT_Augment_DuoQueue",
  "TFT_Augment_ExplosiveGrowth",
  "TFT_Augment_ExplosiveGrowthPlus",
  "TFT_Augment_FinalResistance",
  "TFT_Augment_FindYourCenter",
  "TFT_Augment_Flexible",
  "TFT_Augment_FortuneFavorsTheBold",
  "TFT_Augment_GiantAndMighty",
  "TFT_Augment_GoldenQuest",
  "TFT_Augment_HardCommit",
  "TFT_Augment_HighVoltage",
  "TFT_Augment_ImTheCarryNow",
  "TFT_Augment_InvestedPlus",
  "TFT_Augment_InvestedPlusPlus",
  "TFT_Augment_ItemCollector1",
  "TFT_Augment_ItemCollector2",
  "TFT_Augment_ItemLadder",
  "TFT_Augment_MarksmansToolbox",
  "TFT_Augment_Mentorship1",
  "TFT_Augment_Mentorship2",
  "TFT_Augment_OopsAllRageblades",
  "TFT_Augment_PatienceIsAVirtue",
  "TFT_Augment_PerfectLoss",
  "TFT_Augment_Pilfer",
  "TFT_Augment_Placebo",
  "TFT_Augment_PlaceboPlus",
  "TFT_Augment_RanduinsImmovableObject",
  "TFT_Augment_ReinforcedRejuvenation1",
  "TFT_Augment_ReinforcedRejuvenation2",
  "TFT_Augment_Replication",
  "TFT_Augment_RestartMission",
  "TFT_Augment_ShimmerscaleEssence",
  "TFT_Augment_Spellblades",
  "TFT_Augment_SpellcastersToolbox",
  "TFT_Augment_SubscriptionService",
  "TFT_Augment_SupportSentinel",
  "TFT_Augment_SupportSentinel2",
  "TFT_Augment_ThornPlatedArmor",
  "TFT_Augment_TraitTracker",
  "TFT_Augment_TwoTanky",
  "TFT_Augment_UnleashTheBeast",
  "TFT_Augment_UpwardMobility",
  "TFT_Augment_VerticallyInclined",
  "TFT_Augment_WorthTheWaitGold",
  "TFT_Augment_WorthTheWaitPrismatic"
]

export const itemsDataIngles = [
    {
        "apiName": "TFT12_Augment_Dragon",
        "associatedTraits": [
            "TFT12_Dragon"
        ],
        "composition": [],
        "desc": "Dragons gain @Health*100@% Health and @AttackSpeed*100@% Attack Speed. After Dragons score @TakedownThreshold@ champion takedowns, gain a Smolder. Gain a Nomsy and a Shyvana.<br><br>Takedowns: @TFTUnitProperty.item:TFT12_Augment_Dragon_BurnDamage@",
        "effects": {
            "AttackSpeed": 0.18000000715255737,
            "Health": 0.10000000149011612,
            "TakedownThreshold": 60.0
        },
        "from": null,
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DraconicMastery_II.TFT_Set12.tex",
        "id": null,
        "incompatibleTraits": [],
        "name": "Draconic Mastery",
        "unique": false
    },
  {
      "apiName": "TFT3_Item_StarGuardianSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_Spatula"
      ],
      "desc": "tft_item_description_StarGuardianSpatulaItem",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_StarGuardian.tex",
      "id": null,
      "incompatibleTraits": [
          "StarGuardian"
      ],
      "name": "tft_item_name_StarGuardianSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_BlademasterSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_Spatula"
      ],
      "desc": "tft_item_description_SlicerSpatulaItem",
      "effects": {
          "AD": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Blademaster.tex",
      "id": null,
      "incompatibleTraits": [
          "Set3_Blademaster"
      ],
      "name": "tft_item_name_UmbralGlaive",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_InfiltratorSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_Spatula"
      ],
      "desc": "tft_item_description_InfiltratorSpatulaItem",
      "effects": {
          "AS": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Infiltrator.tex",
      "id": null,
      "incompatibleTraits": [
          "Infiltrator"
      ],
      "name": "tft_item_name_InfiltratorSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_CelestialSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "tft_item_description_CelestialSpatulaItem",
      "effects": {
          "MagicResist": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Celestial.tex",
      "id": null,
      "incompatibleTraits": [
          "Set3_Celestial"
      ],
      "name": "tft_item_name_CelestialSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_ProtectorSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "The holder gains the Protector trait.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "Health": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Protector.tex",
      "id": null,
      "incompatibleTraits": [
          "Protector"
      ],
      "name": "Protector's Chestguard",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_DarkStarSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_SparringGloves",
          "TFT_Item_Spatula"
      ],
      "desc": "tft_item_description_DarkStarSpatulaItem",
      "effects": {
          "CritChance": 10,
          "DodgeChance": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_DarkStar.tex",
      "id": null,
      "incompatibleTraits": [
          "DarkStar"
      ],
      "name": "tft_item_name_DarkStarSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_RebelSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_Spatula"
      ],
      "desc": "tft_item_description_RebelSpatulaItem",
      "effects": {
          "Armor": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Rebel.tex",
      "id": null,
      "incompatibleTraits": [
          "Rebel"
      ],
      "name": "tft_item_name_RebelSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_DemolitionistSpatulaItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_DemolitionistSpatulaItem",
      "effects": {
          "AP": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Demolitionist.tex",
      "id": null,
      "incompatibleTraits": [
          "Demolitionist"
      ],
      "name": "tft_item_name_DemolitionistSpatulaItem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_BattlecastSpatulaItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_Spatula"
      ],
      "desc": "The wearer gains the Battlecast trait.<br><br><tftitemrules>[Unique - Only One Per Champion]</tftitemrules>",
      "effects": {
          "AP": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Battlecast.tex",
      "id": null,
      "incompatibleTraits": [
          "Battlecast"
      ],
      "name": "Battlecast Plating",
      "unique": true
  },
  {
      "apiName": "TFT_Augment_AllThatShimmersPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Open an Armory and choose a gold-generating Artifact. Gain a Magnetic Remover and @GoldGranted@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "ArmoryChoiceCount": 3,
          "GoldGranted": 4,
          "InterestCap": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/All-that-Shimmers-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All That Shimmers+",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ItemCollector2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. For each unique item they are holding, your team gains bonus @Health@ Health, @AD*100@ Attack Damage, and @AP@ Ability Power.",
      "effects": {
          "AD": 0.014999999664723873,
          "AP": 1.5,
          "BaseHP": 20,
          "Health": 5,
          "{74536db7}": 99
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemCollector_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Collector II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ItemCollector1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. For each unique item they are holding, your team gains bonus @Health@ Health, @AD*100@ Attack Damage, and @AP@ Ability Power.",
      "effects": {
          "AD": 0.009999999776482582,
          "AP": 1,
          "BaseHP": 10,
          "Health": 2,
          "{74536db7}": 99
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemCollector_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Collector I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AllThatShimmers",
      "associatedTraits": [],
      "composition": [],
      "desc": "Open an Armory and choose a gold-generating Artifact items and gain a Magnetic Remover. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "ArmoryChoiceCount": 3,
          "InterestCap": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/All-that-Shimmers-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All That Shimmers",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_BlitzcrankCarry",
      "associatedTraits": [
          "TFT12_Vanguard",
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Gain a 2-star Blitzcrank. Your strongest Blitzcrank becomes supercharged, dealing magic damage to 2 nearby enemies every @TooltipDuration@ seconds and on every Ability cast.",
      "effects": {
          "TooltipBonusDamage": 40,
          "TooltipDuration": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ZapAttack_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zap Attack",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Preserver",
      "associatedTraits": [
          "TFT12_Preserver"
      ],
      "composition": [],
      "desc": "Your Preservers gain both Mana and Health restoration from the trait. Preservers gain @BonusDamage*100@% Damage Amp. Gain a Bard and a Zilean.",
      "effects": {
          "BonusDamage": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AggressivePreservation_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Aggressive Preservation",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ScholarCrest",
      "associatedTraits": [
          "TFT12_Scholar"
      ],
      "composition": [],
      "desc": "Gain a Scholar emblem and an Ahri.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Scholar1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scholar Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_MultistrikerCrown",
      "associatedTraits": [
          "TFT12_Multistriker"
      ],
      "composition": [],
      "desc": "Gain a Multistriker emblem, a Quicksilver, and a Kassadin.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Weaponmaster_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Multistriker Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_BastionCrown",
      "associatedTraits": [
          "TFT12_Bastion"
      ],
      "composition": [],
      "desc": "Gain a Bastion emblem, a Steadfast Heart, and a Shen.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Bastion_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bastion Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Witch",
      "associatedTraits": [
          "TFT12_Witchcraft"
      ],
      "composition": [],
      "desc": "Witch curses last forever. Witch Abilities also curse the nearest uncursed champion. If all champions are cursed, Witches gain @BonusADAP@% Attack Damage and Ability Power. Gain a Poppy and a Cassiopeia.",
      "effects": {
          "BonusADAP": 20,
          "CurseDuration": 999
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Potions201_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Potions 201",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Mage",
      "associatedTraits": [
          "TFT12_Mage"
      ],
      "composition": [],
      "desc": "Whenever a Mage casts an Ability, they grant @Mana@ Mana to the nearest ally. Gain a Soraka and a Galio.",
      "effects": {
          "Mana": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PracticePartners_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Practice Partners",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_SugarcraftCrest",
      "associatedTraits": [
          "TFT12_Sugarcraft"
      ],
      "composition": [],
      "desc": "Gain a Sugarcraft emblem and a Rumble.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Sugarcraft1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sugarcraft Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PoppyCarry",
      "associatedTraits": [
          "TFT12_Bastion",
          "TFT12_Witchcraft"
      ],
      "composition": [],
      "desc": "Gain a 2-star Poppy. Your strongest Poppy's Ability no longer Shields, but strikes @TOOLTIPStrikes@ times, dealing @TOOLTIPReducedDamage@% of the original damage.",
      "effects": {
          "TOOLTIPReducedDamage": 75,
          "TOOLTIPStrikes": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WitchyWallops_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Witchy Wallop",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_RumbleCarryPlus",
      "associatedTraits": [
          "TFT12_Sugarcraft",
          "TFT12_Vanguard",
          "TFT12_Blaster"
      ],
      "composition": [],
      "desc": "Gain 2 Rumbles. Your strongest Rumble's Ability deals @TOOLTIPONLYBonusDamage@% damage and costs @TOOLTIPONLYReducedMana@ less Mana but no longer reduces damage. Rumble also gains @TOOLTIPONLYOmnivamp@% Omnivamp.",
      "effects": {
          "TOOLTIPONLYBonusDamage": 190,
          "TOOLTIPONLYOmnivamp": 20,
          "TOOLTIPONLYReducedMana": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MoltenCaramel_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Molten Caramel+",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ShapeshifterPlus",
      "associatedTraits": [
          "TFT12_Shapeshifter"
      ],
      "composition": [],
      "desc": "Shapeshifters that begin combat next to another Shapeshifter gain @BonusHealth@ permanent Health. Shapeshifters gain @Health@ Health now. Gain an Elise and a Jayce.",
      "effects": {
          "BonusHealth": 30,
          "Health": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EternalGrowth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eternal Growth+",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PreserverCrown",
      "associatedTraits": [
          "TFT12_Preserver"
      ],
      "composition": [],
      "desc": "Gain a Preserver emblem, a Nashor's Tooth, and a Bard.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Preserver_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Preserver Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ChronoCrest",
      "associatedTraits": [
          "TFT12_Chrono"
      ],
      "composition": [],
      "desc": "Gain a Chrono emblem and a Zilean.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Time1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chrono Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_GalioCarryPlus",
      "associatedTraits": [
          "TFT12_Mage",
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain 2 Galios. Your strongest Galio gain +@IncRange@ Range and gains @TOOLTIPONLYMANA@ Mana and @TOOLTIPONLYAP@ Ability Power on each attack. His spell deals @TOOLTIPBonusDamage*100@% increased damage but no longer stuns or reduces damage.",
      "effects": {
          "IncRange": 3,
          "TOOLTIPONLYAP": 5,
          "TOOLTIPONLYMANA": 15,
          "TooltipBonusDamage": 1.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dejavu_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Deja Vu+",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Honeymancy",
      "associatedTraits": [
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Honeymancers gain @BonusBees@ more Bee. When Bees jump to a new Honeymancer, the Honeymancer gains a @MaxHealthPct*100@% max Health Shield. Gain a Blitzcrank and a Kog'Maw.",
      "effects": {
          "BonusBees": 1,
          "MaxHealthPct": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BeestFriends_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bee-st Friends",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Sugarcraft",
      "associatedTraits": [
          "TFT12_Sugarcraft"
      ],
      "composition": [],
      "desc": "Sugarcrafters gain @HealthPer@ Health and @GoldChancePer*100@% chance to drop 1 gold on kill for each component they hold. Gain a Soraka and a Rumble.<br><br><tftitemrules>Artifact, Support, and Radiant items count as 2 components.</tftitemrules>",
      "effects": {
          "GoldChancePer": 0.10000000149011612,
          "HealthPer": 60,
          "{308eaacf}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CaramelizedComforts_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caramelized Comforts",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Chrono",
      "associatedTraits": [
          "TFT12_Chrono"
      ],
      "composition": [],
      "desc": "After casting an Ability, Chronomancers gain @AttackSpeed*100@% Attack Speed and @Omnivamp*100@% Omnivamp for @Duration@ seconds. Gain a Jax and a Zilean.",
      "effects": {
          "AttackSpeed": 0.4000000059604645,
          "Duration": 3,
          "Omnivamp": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FastForward_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fast Forward",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PortalCrest",
      "associatedTraits": [
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain a Portal emblem and a Kassadin.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Portal1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portal Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Shapeshifter",
      "associatedTraits": [
          "TFT12_Shapeshifter"
      ],
      "composition": [],
      "desc": "Shapeshifters that begin combat next to another Shapeshifter gain @BonusHealth@ permanent Health. Gain an Elise and a Jayce.",
      "effects": {
          "BonusHealth": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EternalGrowth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eternal Growth",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_FrostCrest",
      "associatedTraits": [
          "TFT12_Frost"
      ],
      "composition": [],
      "desc": "Gain a Frost emblem and a Zilean.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Winter1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frost Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_VanguardCrown",
      "associatedTraits": [
          "TFT12_Vanguard"
      ],
      "composition": [],
      "desc": "Gain a Vanguard emblem, a Protector's Vow, and a Rumble.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Vanguard_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vanguard Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Pyro",
      "associatedTraits": [
          "TFT12_Pyro"
      ],
      "composition": [],
      "desc": "Pyromancers' attacks deal @TrueDamage@ bonus magic damage for every @CinderCount@ cinders collected. Gain an Akali and a Shen.",
      "effects": {
          "CinderCount": 3,
          "TrueDamage": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cauterize_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cauterize",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_NunuCarryPlus",
      "associatedTraits": [
          "TFT12_Bastion",
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Gain 2 Nunus. Your strongest Nunu gains @TOOLTIPBaseHP@ Health and deals @TOOLTIPBonusDamage*100@% bonus damage per @TOOLTIPHealthInterval@ Health. Whenever his Ability kills an enemy, Nunu permanently gains @TOOLTIPHealthPerKill@ Health.",
      "effects": {
          "TOOLTIPBaseHP": 100,
          "TOOLTIPHealthInterval": 150,
          "TOOLTIPHealthPerKill": 35,
          "TooltipBonusDamage": 0.019999999552965164
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SweetTooth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sweet Tooth+",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ArcanaCrown",
      "associatedTraits": [
          "TFT12_Arcana"
      ],
      "composition": [],
      "desc": "Gain an Arcana Emblem, an Adaptive Helm, an Ahri, and a Hecarim.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Arcana_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcana Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_WitchcraftCrest",
      "associatedTraits": [
          "TFT12_Witchcraft"
      ],
      "composition": [],
      "desc": "Gain a Witchcraft emblem and a Cassiopeia.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Witch1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Witchcraft Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_MageCrown",
      "associatedTraits": [
          "TFT12_Mage"
      ],
      "composition": [],
      "desc": "Gain a Mage Emblem, an Ionic Spark, and a Galio.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Mage_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mage Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Multistriker",
      "associatedTraits": [
          "TFT12_Multistriker"
      ],
      "composition": [],
      "desc": "Your Multistriker's attacks apply a stack on their target for @StackDuration@ seconds. Every 3rd stack deals true damage equal to @PercentHPDamage@% of the target's max Health. Gain a Kassadin and an Ashe.",
      "effects": {
          "PercentHPDamage": 4,
          "StackDuration": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PresstheAttack_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Press The Attack",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Eldritch",
      "associatedTraits": [
          "TFT12_Eldritch"
      ],
      "composition": [],
      "desc": "The Eldritch summon is holding beneficial items. The summon gains bonus @HealthPct*100@% Health and @AbilityPower@ Ability Power. Gain an Elise and a Syndra.",
      "effects": {
          "AbilityPower": 30,
          "HealthPct": 0.10000000149011612,
          "{a1456915}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SchoolMascot_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "School Mascot",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Bastion",
      "associatedTraits": [
          "TFT12_Bastion"
      ],
      "composition": [],
      "desc": "Combat start: Your strongest Bastion gains @Health*100@% Health. When other Bastions die, they transfer @DefenseRatio*100@% of their Armor and Magic Resist to it. Gain a Poppy and&nbsp;a&nbsp;Nunu. ",
      "effects": {
          "DefenseRatio": 0.20000000298023224,
          "Health": 0.20000000298023224,
          "SizeIncrease": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RaidBoss_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Raid Boss",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Vanguard",
      "associatedTraits": [
          "TFT12_Vanguard"
      ],
      "composition": [],
      "desc": "Your Vanguards have @BonusShield*100@% stronger shields. Vanguards become immune to crowd control for @CCImmuneDuration@ seconds whenever they gain a shield. Gain a Rumble and a Blitzcrank.",
      "effects": {
          "BonusShield": 0.30000001192092896,
          "CCImmuneDuration": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ShieldsUp_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shields Up",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_HunterCrest",
      "associatedTraits": [
          "TFT12_Hunter"
      ],
      "composition": [],
      "desc": "Gain a Hunter emblem and a Kog'Maw.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Hunter1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hunter Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_MultistrikerCrest",
      "associatedTraits": [
          "TFT12_Multistriker"
      ],
      "composition": [],
      "desc": "Gain a Multistriker emblem and a Kassadin.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Weaponmaster1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Multistriker Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_IncantorCrown",
      "associatedTraits": [
          "TFT12_Incantor"
      ],
      "composition": [],
      "desc": "Gain an Incantor emblem a Jeweled Gauntlet, and a Syndra.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Incantor_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Incantor Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Hunter",
      "associatedTraits": [
          "TFT12_Hunter"
      ],
      "composition": [],
      "desc": "Your Hunters execute enemies below @ExecuteThreshold*100@% health and gain @BonusAttackSpeed*100@% Attack Speed. Gain a Twitch and a Kog'maw.",
      "effects": {
          "BonusAttackSpeed": 0.10000000149011612,
          "ExecuteThreshold": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EndlessHunt_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hunting Frenzy",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ScholarCrown",
      "associatedTraits": [
          "TFT12_Scholar"
      ],
      "composition": [],
      "desc": "Gain a Scholar emblem, a Spear of Shojin, and a Bard.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Scholar_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scholar Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PyroCrest",
      "associatedTraits": [
          "TFT12_Pyro"
      ],
      "composition": [],
      "desc": "Gain a Pyro emblem and an Akali.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Pyrokinesis1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pyro Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ShapeshifterCrest",
      "associatedTraits": [
          "TFT12_Shapeshifter"
      ],
      "composition": [],
      "desc": "Gain a Shapeshifter emblem and a Shyvana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Shapeshifter1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shapeshifter Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_BastionCrest",
      "associatedTraits": [
          "TFT12_Bastion"
      ],
      "composition": [],
      "desc": "Gain a Bastion emblem and a Nunu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Bastion1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bastion Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_SugarcraftCrown",
      "associatedTraits": [
          "TFT12_Sugarcraft"
      ],
      "composition": [],
      "desc": "Gain a Sugarcraft Emblem, a Redemption, and a Rumble.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Sugarcraft_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sugarcraft Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Transfiguration",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random component. For every @CharmsPer@ Charms you purchase this game, gain another component (max +@MaxComponents@).<br>(Charms:&nbsp;@TFTUnitProperty.item:TFT_Augment_Transfiguration_CharmsBought@)",
      "effects": {
          "CharmsPer": 3,
          "MaxComponents": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfiguration_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfiguration",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_BlasterCrown",
      "associatedTraits": [
          "TFT12_Blaster"
      ],
      "composition": [],
      "desc": "Gain an Blaster emblem, a Spear Of Shojin, and an Ezreal.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Artillerist_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blaster Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Arcana",
      "associatedTraits": [
          "TFT12_Arcana"
      ],
      "composition": [],
      "desc": "Arcana champions deal @BonusDamage*100@% bonus damage. If they start combat holding 2 items, they gain a recommended 3rd completed item. Gain an Ahri and a Hecarim.",
      "effects": {
          "BonusDamage": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ArcaneConduit_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcane Conduit",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Incantor",
      "associatedTraits": [
          "TFT12_Incantor"
      ],
      "composition": [],
      "desc": "Enemies hit by Incantor Abilities deal @DamageReduction*100@% less damage for @Duration@ seconds. At max stacks, Incantors gain @ManaPerSecond@ Mana every @ManaDuration@ seconds. Gain a Ziggs and a Syndra.",
      "effects": {
          "DamageReduction": 0.10000000149011612,
          "Duration": 2,
          "ManaDuration": 2,
          "ManaPerSecond": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DefensiveArts_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Defensive Arts",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_WukongCarry",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 2 Wukongs. Your strongest Wukong's Ability scales with Attack Damage instead of resists. After each cast, Wukong gains stacking @TOOLTIPADPerCast@% Attack Damage and @TOOLTIPASPerCast@% Attack Speed.",
      "effects": {
          "TOOLTIPADPerCast": 20,
          "TOOLTIPASPerCast": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SpinToWin_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spin To Win",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_HoneymancyCrest",
      "associatedTraits": [
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Gain a Honeymancy emblem and a Nunu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Bee1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Honeymancy Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_EliseCarry",
      "associatedTraits": [
          "TFT12_Eldritch",
          "TFT12_Shapeshifter"
      ],
      "composition": [],
      "desc": "Gain a 2-star Elise. Your strongest Elise's Ability no longer Stuns, but poisons her target and the 2 closest enemies with @TOOLTIPBonusDamage@% damage over @TOOLTIPBleedDuration@ seconds.",
      "effects": {
          "TOOLTIPBleedDuration": 4,
          "TooltipBonusDamage": 90,
          "{8cfa39af}": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SpiderQueen_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spider Queen",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_VanguardCrest",
      "associatedTraits": [
          "TFT12_Vanguard"
      ],
      "composition": [],
      "desc": "Gain a Vanguard emblem and a Rumble.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Vanguard1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vanguard Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_WarriorCrest",
      "associatedTraits": [
          "TFT12_Warrior"
      ],
      "composition": [],
      "desc": "Gain a Warrior emblem and an Akali.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Warrior1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warrior Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Scholar",
      "associatedTraits": [
          "TFT12_Scholar"
      ],
      "composition": [],
      "desc": "Every time your Scholars spend @ManaNeeded@ Mana, all Scholars gain @ASPerThreshold*100@% Attack Speed. Gain a Zoe and an Ahri. ",
      "effects": {
          "ASPerThreshold": 0.11999999731779099,
          "ManaNeeded": 80
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HigherEducation_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Higher Education",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Frost",
      "associatedTraits": [
          "TFT12_Frost"
      ],
      "composition": [],
      "desc": "The Frost trait also grants @NumDummies@ placeable Frost Wolf equipped with a Protector's Vow. The wolf gains @BonusAS*100@% Attack Speed and @BonusHPPerTier@ Health per Frost tier. Gain a Warwick and a Zilean.",
      "effects": {
          "BonusAS": 0.4000000059604645,
          "BonusHPPerTier": 300,
          "HealthRatio": 1.2999999523162842,
          "NumDummies": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FrostyFrontline_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Winter is Coming",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ChronoCrown",
      "associatedTraits": [
          "TFT12_Chrono"
      ],
      "composition": [],
      "desc": "Gain a Chrono emblem, an Archangel's Staff, and a Zilean.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Time_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chrono Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_FrostCrown",
      "associatedTraits": [
          "TFT12_Frost"
      ],
      "composition": [],
      "desc": "Gain a Frost Emblem, a Protector's Vow, and a Swain.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Winter_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frost Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Faerie",
      "associatedTraits": [
          "TFT12_Faerie"
      ],
      "composition": [],
      "desc": "Every @Duration@ seconds, all Faeries restore @MaxHPHeal*100@% max Health, and the Faerie Queen gains @ADAPPer*100@% Attack Damage and Ability Power for every other suriving Faerie. Gain a Lillia and a Tristana.",
      "effects": {
          "ADAPPer": 0.014999999664723873,
          "Duration": 3,
          "MaxHPHeal": 0.03999999910593033
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RoyalGuard_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Royal Guard",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_FaerieCrest",
      "associatedTraits": [
          "TFT12_Faerie"
      ],
      "composition": [],
      "desc": "Gain a Faerie emblem and a Tristana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Faerie1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Faerie Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_MageCrest",
      "associatedTraits": [
          "TFT12_Mage"
      ],
      "composition": [],
      "desc": "Gain a Mage Emblem and a Galio.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Mage1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mage Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_Portal",
      "associatedTraits": [
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain a Zoe. At the start of each round, gain a random 1 to 3-cost Portal champion.",
      "effects": {
          "MaxGold": 3,
          "MinGold": 1,
          "{2308ff32}": 0.30000001192092896,
          "{4a4144a8}": 20,
          "{5206392e}": 70,
          "{817b5582}": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PortalDeliveryService_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portal Delivery Service",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_EldritchCrest",
      "associatedTraits": [
          "TFT12_Eldritch"
      ],
      "composition": [],
      "desc": "Gain an Eldritch emblem and a Nilah.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Eldritch1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eldritch Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_WarriorCrown",
      "associatedTraits": [
          "TFT12_Warrior"
      ],
      "composition": [],
      "desc": "Gain a Warrior emblem, a Hand of Justice, and an Akali.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Warrior_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warrior Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PreserverCrest",
      "associatedTraits": [
          "TFT12_Preserver"
      ],
      "composition": [],
      "desc": "Gain a Preserver emblem and a Zilean.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Preserver1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Preserver Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_WitchcraftCrown",
      "associatedTraits": [
          "TFT12_Witchcraft"
      ],
      "composition": [],
      "desc": "Gain a Witchcraft emblem, a Hextech Gunblade, and a Cassiopeia.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Witch_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Witchcraft Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_HunterCrown",
      "associatedTraits": [
          "TFT12_Hunter"
      ],
      "composition": [],
      "desc": "Gain a Hunter emblem, a Runaan's Hurricane, and a Kog'Maw.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Hunter_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hunter Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_HoneymancyCrown",
      "associatedTraits": [
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Gain a Honeymancy emblem, a Gargoyle Stoneplate, and a Nunu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Bee_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Honeymancy Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PyroCrown",
      "associatedTraits": [
          "TFT12_Pyro"
      ],
      "composition": [],
      "desc": "Gain a Pyro emblem, a Infinity Edge, and an Akali.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Pyrokinesis_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pyro Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ShapeshifterCrown",
      "associatedTraits": [
          "TFT12_Shapeshifter"
      ],
      "composition": [],
      "desc": "Gain a Shapeshifter emblem, a Redemption, and a Shyvana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Shapeshifter_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shapeshifter Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_GalioCarry",
      "associatedTraits": [
          "TFT12_Mage",
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain a Galio. Your strongest Galio has +@IncRange@ range and gains @TOOLTIPONLYMANA@ Mana and @TOOLTIPONLYAP@ Ability Power on each attack. His Ability deals @TOOLTIPBonusDamage*100@% more damage, but no longer stuns or reduces damage.",
      "effects": {
          "IncRange": 3,
          "TOOLTIPONLYAP": 5,
          "TOOLTIPONLYMANA": 15,
          "TooltipBonusDamage": 1.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dejavu_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Deja Vu",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ArcanaCrest",
      "associatedTraits": [
          "TFT12_Arcana"
      ],
      "composition": [],
      "desc": "Gain an Arcana Emblem, an Ahri, and a Hecarim.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Arcana_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcana Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_RumbleCarry",
      "associatedTraits": [
          "TFT12_Sugarcraft",
          "TFT12_Vanguard",
          "TFT12_Blaster"
      ],
      "composition": [],
      "desc": "Gain a Rumble. Your strongest Rumble's Ability deals @TOOLTIPONLYBonusDamage@% damage and costs @TOOLTIPONLYReducedMana@ less Mana but no longer reduces damage. Rumble also gains @TOOLTIPONLYOmnivamp@% Omnivamp.",
      "effects": {
          "TOOLTIPONLYBonusDamage": 190,
          "TOOLTIPONLYOmnivamp": 20,
          "TOOLTIPONLYReducedMana": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MoltenCaramel_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Molten Caramel",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_LilliaCarry",
      "associatedTraits": [
          "TFT12_Faerie",
          "TFT12_Bastion"
      ],
      "composition": [],
      "desc": "Gain a 2-star Lillia. Your strongest Lillia gains @TOOLTIPBonusAS@% Attack Speed and moves @TOOLTIPBonusMS@% faster. Her Ability deals @TOOLTIPBonusDamage@% bonus damage, but only hits 1 target.",
      "effects": {
          "TOOLTIPBonusAS": 125,
          "TOOLTIPBonusMS": 150,
          "TooltipBonusDamage": 240
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HighHorsepower_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "High Horsepower",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_BlasterCrest",
      "associatedTraits": [
          "TFT12_Blaster"
      ],
      "composition": [],
      "desc": "Gain an Blaster emblem and a Tristana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Artillerist1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blaster Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_ShenCarry",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 2 Shens. Your strongest Shen's Ability no longer grants damage reduction, but now summons a large molten pillar that damages enemies in a large line.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EtherealBlades_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pillar of Flame",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_NunuCarry",
      "associatedTraits": [
          "TFT12_Bastion",
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Gain a Nunu. Your strongest Nunu gains @TOOLTIPBaseHP@ Health, @TOOLTIPBonusDamage*100@% Damage Amp per @TOOLTIPHealthInterval@ Health, and his heal scales with Health. Whenever his Ability kills an enemy, Nunu permanently gains @TOOLTIPHealthPerKill@ Health.",
      "effects": {
          "TOOLTIPBaseHP": 100,
          "TOOLTIPHealthInterval": 150,
          "TOOLTIPHealthPerKill": 35,
          "TooltipBonusDamage": 0.019999999552965164
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SweetTooth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sweet Tooth",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_IncantorCrest",
      "associatedTraits": [
          "TFT12_Incantor"
      ],
      "composition": [],
      "desc": "Gain an Incantor emblem and a Syndra.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Incantor1_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Incantor Crest",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_FaerieCrown",
      "associatedTraits": [
          "TFT12_Faerie"
      ],
      "composition": [],
      "desc": "Gain a Faerie emblem, a Giant Slayer, and a Tristana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Faerie_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Faerie Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_PortalCrown",
      "associatedTraits": [
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain a Portal emblem, a Spear of Shojin, and a Kassadin.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Portal_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portal Crown",
      "unique": false
  },
  {
      "apiName": "TFT12_Augment_EldritchCrown",
      "associatedTraits": [
          "TFT12_Eldritch"
      ],
      "composition": [],
      "desc": "Gain an Eldritch emblem, a Bloodthirster, and a Nilah.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Eldritch_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eldritch Crown",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_OnCast",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_OnCast",
      "effects": {
          "AoEDamage": 150,
          "AttackSpeedAmount": 18,
          "AttackSpeedDuration": 200,
          "GoldChance": 33,
          "HealAmount": 300,
          "PercentHealthShield": 20,
          "ShieldDuration": 4,
          "{00ac4fc9}": 12,
          "{2d7e43a8}": 20,
          "{3ba78496}": 18,
          "{5d8ecbba}": 18,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_OnCast",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team gains @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_PermHP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team gains @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@ % Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_AllyDeath",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_OtherAdminDeath",
      "effects": {
          "AoEDamage": 400,
          "AttackSpeedAmount": 15,
          "AttackSpeedDuration": 60,
          "GoldChance": 20,
          "HealAmount": 250,
          "PercentHealthShield": 30,
          "ShieldDuration": 10,
          "{00ac4fc9}": 10,
          "{2d7e43a8}": 15,
          "{3ba78496}": 15,
          "{5d8ecbba}": 15,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_OtherAdminDeath",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team heals @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_EveryXAttacks",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_Every3Attacks",
      "effects": {
          "AoEDamage": 75,
          "AttackSpeedAmount": 40,
          "AttackSpeedDuration": 3,
          "GoldChance": 20,
          "HealAmount": 120,
          "NumAttacks": 3,
          "PercentHealthShield": 10,
          "ShieldDuration": 4,
          "{00ac4fc9}": 2,
          "{2d7e43a8}": 10,
          "{3ba78496}": 15,
          "{5d8ecbba}": 10,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_Every3Attacks",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_GainMana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally death, A.D.M.I.N.s gain @TFTUnitProperty.trait:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team gains @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@TFTUnitProperty.item:TFT8_Admin_GoldChance@% chance to drop gold",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team gains @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_EveryXSecondsTeam",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_CombatStart",
      "effects": {
          "AoEDamage": 200,
          "AttackSpeedAmount": 12,
          "AttackSpeedDuration": 200,
          "GoldChance": 15,
          "HealAmount": 150,
          "PercentHealthShield": 35,
          "ShieldDuration": 15,
          "{00ac4fc9}": 6,
          "{2d7e43a8}": 20,
          "{3ba78496}": 12,
          "{5d8ecbba}": 12,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: ",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s get @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_CombatStart",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_CombatStart",
      "effects": {
          "AoEDamage": 200,
          "AttackSpeedAmount": 40,
          "AttackSpeedDuration": 200,
          "GoldChance": 50,
          "HealAmount": "null",
          "PercentHealthShield": 35,
          "ShieldDuration": 15,
          "{00ac4fc9}": 30,
          "{2d7e43a8}": 50,
          "{3ba78496}": 40,
          "{5d8ecbba}": 40,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: ",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_SingleTargetDamage",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "fire a missile dealing true damage to the A.D.M.I.N. units' current combat target",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_OnEnemyDeath",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_OnKill",
      "effects": {
          "AoEDamage": 200,
          "AttackSpeedAmount": 20,
          "AttackSpeedDuration": 200,
          "GoldChance": 40,
          "HealAmount": 400,
          "PercentHealthShield": 30,
          "ShieldDuration": 4,
          "{00ac4fc9}": 15,
          "{2d7e43a8}": 20,
          "{3ba78496}": 20,
          "{5d8ecbba}": 20,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_OnKill",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStart_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_EveryXSeconds",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_Every6Seconds",
      "effects": {
          "AoEDamage": 75,
          "AttackSpeedAmount": 18,
          "AttackSpeedDuration": 200,
          "GoldChance": 25,
          "HealAmount": 250,
          "NumSeconds": 5,
          "PercentHealthShield": 15,
          "ShieldDuration": 4,
          "{00ac4fc9}": 10,
          "{2d7e43a8}": 40,
          "{3ba78496}": 18,
          "{5d8ecbba}": 18,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_Every6Seconds",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_AttackSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% health, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ASAmount@% Attack Speed",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_CombatStartTeam",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_CombatStart",
      "effects": {
          "AoEDamage": 200,
          "AttackSpeedAmount": 25,
          "AttackSpeedDuration": 200,
          "GoldChance": 25,
          "HealAmount": "null",
          "PercentHealthShield": 25,
          "ShieldDuration": 15,
          "{00ac4fc9}": 20,
          "{2d7e43a8}": 25,
          "{3ba78496}": 25,
          "{5d8ecbba}": 25,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: ",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health.",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_AoEDamage",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": null,
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_PermanentHealth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_PermHP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains @TFTUnitProperty.item:TFT8_Admin_PermanentHealthPerActivation@ permanent maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_AllyDeath_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On ally A.D.M.I.N. death, gain a shield for @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% of maximum Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSecsTeam_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, your team gains @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXSeconds_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 5 seconds, A.D.M.I.N.s gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_HealthThreshold_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At @TFTUnitProperty.item:TFT8_Admin_HealthThreshold@% Health, A.D.M.I.N.s gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_EveryXAttacks_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Every 3 attacks, gain @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCause_HealthThreshold",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_TFT8_AdminCause_HealthThreshold",
      "effects": {
          "AoEDamage": 400,
          "AttackSpeedAmount": 60,
          "AttackSpeedDuration": 200,
          "GoldChance": 60,
          "HealAmount": 600,
          "HealthThreshold": 66,
          "PercentHealthShield": 35,
          "ShieldDuration": 15,
          "{00ac4fc9}": 45,
          "{2d7e43a8}": 100,
          "{3ba78496}": 60,
          "{5d8ecbba}": 60,
          "{9a186b7d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/InnovatorSoul1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_TFT8_AdminCause_HealthThreshold",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer heals @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_CombatStartTeam_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat start: your team gains @TFTUnitProperty.item:TFT8_Admin_ManaGained@ Mana",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_Heal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s heal @TFTUnitProperty.item:TFT8_Admin_HealAmount@ Health",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_GainAP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains @TFTUnitProperty.item:TFT8_Admin_APGained@ Ability Power",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminEffect_Tier2Boost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Increase all effects by @TFTUnitProperty.item:TFT8_Admin_Tier2Boost@%.",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnCast_Shield",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On Ability cast, A.D.M.I.N.s gain a @TFTUnitProperty.item:TFT8_Admin_ShieldAmount@% Health shield",
      "unique": false
  },
  {
      "apiName": "TFT8_AdminCauseEffect_OnKill_GainAD",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On kill, the killer gains @TFTUnitProperty.item:TFT8_Admin_ADGained@% Attack Damage",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Book",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Moon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Book",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Bag.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Bag",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Spatula",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Spatula.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Spatula",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Fish.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Fish",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Chest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Chest",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Sword.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Sword",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Dice",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ShopReroll.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_X",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Shell",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Shell.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Shell",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Kraken",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Hydra.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Kraken",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Scratch.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_X",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Ship",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Ship.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Ship",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Coin.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Coin",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Soldier",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Mercenary_Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Soldier.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Mercenary_Soldier",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Fish",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Fish"
      ],
      "desc": "1 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Spatula"
      ],
      "desc": "50 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercChest",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain a Spatula and an Item. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Chest",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Bag",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Bag"
      ],
      "desc": "6 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercBook",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain a Thieve's Gloves.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Book",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Soldier_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Soldier",
          "TFT6_Merc_Ship"
      ],
      "desc": "3 4-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercSword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 1 5-cost champion and 12 gold.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Sword",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Bag",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Bag"
      ],
      "desc": "5 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Book_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Book",
          "TFT6_Merc_Spatula"
      ],
      "desc": "1 Chalice of Power, 1 Zeke's Herald, and 10 gold are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Spatula"
      ],
      "desc": "1 Spatula has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Book",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Book"
      ],
      "desc": "6 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Soldier_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Soldier",
          "TFT6_Merc_Kraken"
      ],
      "desc": "A Loaded Dice and 2 gold are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Soldier"
      ],
      "desc": "4 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 Loaded Dice has been added to your chest. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Shell",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Shell"
      ],
      "desc": "A defensive component and 2 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercBag",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 2 items.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Bag",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercSoldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 2 5-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Soldier",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword_Sword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Sword",
          "TFT6_Merc_Sword"
      ],
      "desc": "A Thief's Gloves has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Ship_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Ship",
          "TFT6_Merc_Ship"
      ],
      "desc": "2 5-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Book_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Book",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 utility component and 1 Neeko's Help has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Shell_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Shell",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 defensive component and 1 Neeko's Help has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Coin",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Coin"
      ],
      "desc": "8 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Ship"
      ],
      "desc": "A 4-cost champion has been added to your chest. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Soldier"
      ],
      "desc": "3 3-cost champions are placed in your chest. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Ship"
      ],
      "desc": "A 4-cost champion and 3 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Shell_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Shell",
          "TFT6_Merc_Spatula"
      ],
      "desc": "1 Dragon's Claw, 1 Bramblevest, and 10 gold are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Ship_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Ship",
          "TFT6_Merc_Spatula"
      ],
      "desc": "A 2-star 5-cost has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Fish",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Fish"
      ],
      "desc": "4 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercShip",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 3 item components.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Ship",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 Neeko's Help has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Sword",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 offensive component and 1 Neeko's Help has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Ship"
      ],
      "desc": "10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Soldier_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Soldier",
          "TFT6_Merc_Spatula"
      ],
      "desc": "2 Loaded Dice and a 2-star 4-cost are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Shell",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Shell"
      ],
      "desc": "6 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_X",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_X"
      ],
      "desc": "Yarr!!! You got nothing. Try again next round. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/Mercenary_Scratch.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "No Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 Neeko's Help and 2 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Soldier"
      ],
      "desc": "2 2-cost champions are placed in your chest. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Spatula"
      ],
      "desc": "25 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Kraken"
      ],
      "desc": "10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Kraken_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Kraken",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 item component and 1 Neeko's Help has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Ship"
      ],
      "desc": "2 4-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercMonster",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 1 Neeko's Help and 12 gold.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Kraken",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Chest",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Chest"
      ],
      "desc": "10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Sword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Sword"
      ],
      "desc": "1 offensive item component has been added to your chest. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Coin",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Coin"
      ],
      "desc": "3 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Book_Book",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Book",
          "TFT6_Merc_Book"
      ],
      "desc": "A Tome of Traits has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Book",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Book"
      ],
      "desc": "A utility item component has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag_Kraken",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Kraken"
      ],
      "desc": "1 Neeko's Help and 5 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Chest",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Chest"
      ],
      "desc": "4 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Sword",
          "TFT6_Merc_Ship"
      ],
      "desc": "A 5-cost champion and 10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Coin",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Coin"
      ],
      "desc": "2 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Sword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Sword"
      ],
      "desc": "A 4-cost champion and 10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag_Bag",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "1 item component has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Sword",
          "TFT6_Merc_Spatula"
      ],
      "desc": "2 Thief's Gloves and 10 gold are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Spatula"
      ],
      "desc": "1 random full item and 2 components are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Spatula_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Spatula",
          "TFT6_Merc_Spatula"
      ],
      "desc": "A Tactician's Crown has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Spatula"
      ],
      "desc": "A Spatula has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Sword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Sword"
      ],
      "desc": "An offensive component and 2 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Shell",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Shell"
      ],
      "desc": "A defensive item component has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Sword",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Sword"
      ],
      "desc": "7 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Fish_Chest",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Fish",
          "TFT6_Merc_Chest"
      ],
      "desc": "8 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_X_Bag",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_X",
          "TFT6_Merc_Bag"
      ],
      "desc": "3 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLootSilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Soldier_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Soldier",
          "TFT6_Merc_Soldier"
      ],
      "desc": "2 4-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Chest",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Chest"
      ],
      "desc": "2 item components are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Kraken_Spatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Kraken",
          "TFT6_Merc_Spatula"
      ],
      "desc": "1 full item and 2 Neeko's Help have been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "JACKPOT",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Sword_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Sword",
          "TFT6_Merc_Soldier"
      ],
      "desc": "2 4-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Chest_Ship",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Chest",
          "TFT6_Merc_Ship"
      ],
      "desc": "A 4-cost champion and 10 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Book",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Book"
      ],
      "desc": "A utility component and 2 gold has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Bag_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Soldier"
      ],
      "desc": "2 3-cost champions are placed in your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercSpatula",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain a Tactician's Crown",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Spatula",
      "unique": false
  },
  {
      "apiName": "TFT6_Merc_Coin_Soldier",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Coin",
          "TFT6_Merc_Soldier"
      ],
      "desc": "A 3-cost champion has been added to your chest.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Prize",
      "unique": false
  },
  {
      "apiName": "TFT6_5MercShield",
      "associatedTraits": [],
      "composition": [
          "TFT6_Merc_Bag",
          "TFT6_Merc_Bag"
      ],
      "desc": "Gain 3 Frozen Hearts.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set6_Mercenary/MercenaryLoot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Shell",
      "unique": false
  },
  {
      "apiName": "TFT_Item_RabadonsDeathcap",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "",
      "effects": {
          "AP": 50,
          "BonusDamage": 0.15000000596046448,
          "{1543aa48}": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Rabadons_Deathcap.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rabadon's Deathcap",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Amplify2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @CritDamage@% Critical Strike Damage.",
      "effects": {
          "CritDamage": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Amplify II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Amplify3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @CritDamage@% Critical Strike Damage.",
      "effects": {
          "CritDamage": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Amplify III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_JustKeepRollingHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "After you reroll your Shop @Tier1Rolls@ times, rerolls only cost @RefreshCost@ gold.<br><br>(Rerolls this game: @TFTUnitProperty.item:TFT9_JustKeepRollingRolls@)",
      "effects": {
          "RefreshCost": 1,
          "Tier1Rolls": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pirates2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frequent Flier",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ArmyBuildingHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Lesser Champion Duplicator. Gain another after @PlayerCombatNum@ player combats.<br><br><rules>This item allows you to copy a 3-cost or less champion.</rules>",
      "effects": {
          "PlayerCombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Building-an-army-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Team Building",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUp3HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp3Rounds@%)",
      "effects": {
          "BaseAS": 12,
          "IncreasePerRound": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LongDistanceRelationship1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your 2 units furthest from each other form a bond, sharing @PercentShare*100@% of their Armor, Magic Resist, Attack Damage, and Ability Power with each other.",
      "effects": {
          "PercentShare": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Heart-Crown-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Long Distance Pals",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GadgeteenSpirit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Distribute @numitems@ temporary items to the champions with the fewest items.",
      "effects": {
          "NumItems": 1,
          "{a416e152}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gadgeteen Spirit",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUpHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUpRounds@%)",
      "effects": {
          "BaseAS": 5,
          "IncreasePerRound": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BrokenTradeSector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll now, and every @RoundsPerRefresh@ player combats.",
      "effects": {
          "RoundsPerRefresh": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Broken Trade Sector",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GiftsFromAbove",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Distribute @numitems@ temporary items to the champions with the fewest items.",
      "effects": {
          "NumItems": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gifts-from-Above-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spectral Supplies",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GuinsoosLargeBead",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your attacks cannot critically strike, but deal magic damage equal to @CritConversion*100@% of your critical strike chance on hit.",
      "effects": {
          "CritConversion": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guinsoo's Large Bead",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ThinkInsideTheBox3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that don't start combat on the edge of your board gain @AP*100@% Ability Power and @Health@ Health. ",
      "effects": {
          "AP": 0.30000001192092896,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Think Inside The Box III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ThinkInsideTheBox2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that don't start combat on the edge of your board gain @AP*100@% Ability Power and @Health@ Health. ",
      "effects": {
          "AP": 0.20000000298023224,
          "Health": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Think Inside The Box II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StationarySupport1HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @PlayerCombatRounds@ player combats, gain @NumOfDummies@ Training Dummy(s) with @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 1,
          "PlayerCombatRounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stationary-Support-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stationary Support I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BerserkIII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AttackSpeed*100@% Attack Speed per @MissingHealthPercent*100@% missing health.",
      "effects": {
          "AttackSpeed": 0.014999999664723873,
          "MissingHealthPercent": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Berserkers III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AllNatural3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items gain @health@ Health and heal for @Healing*100@% of their max Health each second.",
      "effects": {
          "Healing": 0.09000000357627869,
          "Health": 250
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Natural III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MagicalJourneyPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "After each carousel, randomly gain @XP@ XP or @Rerolls@ free rerolls. Then, randomly gain one of these effects again.",
      "effects": {
          "Rerolls": 4,
          "XP": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magical Journey++",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Jackpot",
      "associatedTraits": [],
      "composition": [],
      "desc": "After you reroll your Shop @RerollAmount@ times, gain a copy of each @UnitCost@-cost champion. <br><br>(Rerolls this game: @TFTUnitProperty.item:TFT9_JackpotRolls@)",
      "effects": {
          "RerollAmount": 40,
          "UnitCost": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jackpot-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Missing Link",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MoneyLaundering",
      "associatedTraits": [],
      "composition": [],
      "desc": "You earn no interest but at the start of every player combat round gain @Gold@ gold per @UnitsPerGold@ units on your bench.",
      "effects": {
          "Gold": 1,
          "UnitsPerGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Money-Laundering--II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Money Laundering",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LevelUpGold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain [newvarplz] XP now. When you buy XP, gain @XP@ more for free.",
      "effects": {
          "XP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LevelUp2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Level Up.",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Executioner",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team executes enemies below @Healththreshold@% Health on hit. Executions have a @GoldChance@% chance to drop @goldgenerated@ gold.",
      "effects": {
          "GoldChance": 10,
          "HealthThreshold": 5,
          "goldgenerated": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Executioner I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MagicalJourney",
      "associatedTraits": [],
      "composition": [],
      "desc": "After each carousel, randomly gain @XP@ XP or @Rerolls@ free rerolls. Then, randomly gain one of these effects again.",
      "effects": {
          "Rerolls": 2,
          "XP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magical Journey",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ReturnOnInvestmentHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you reroll your Shop @RollCount@ times, gain a Tactician's Crown.<br><br>(Refreshes this game: @TFTUnitProperty.item:TFT9_ReturnOnInvestmentRolls@)",
      "effects": {
          "RollCount": 28
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldReserves2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Return on Investment",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CosmicWisdom",
      "associatedTraits": [],
      "composition": [],
      "desc": "Buying XP now costs @InitialCost@ gold. Every time you buy XP this turn, increase the cost by @increase@ to a max of @MaxCost@. You can now reach level 10.",
      "effects": {
          "InitialCost": 2,
          "MaxCost": 4,
          "increase": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cosmic Wisdom I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_DoubleEquipment",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain two copies of a random component.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Double Equipment",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LockStep",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: If your last opponent was higher leveled than you, gain @Experience@ XP. Otherwise, gain @Gold@ gold.",
      "effects": {
          "Experience": 4,
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-of-War-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lock Step",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SentinelsShield",
      "associatedTraits": [],
      "composition": [],
      "desc": "The unit with with the highest Attack Speed gains a @Shield@ Shield for @Duration@ seconds that grants @AttackSpeed*100@% stacking Attack Speed. When the shield is destroyed or expires, it will bounce to the ally with the lowest percent Health and renew.",
      "effects": {
          "AttackSpeed": 0.4000000059604645,
          "Duration": 3,
          "Shield": 400
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sentinel's Shield",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_OnARoll",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever you star up a champion, gain up to @TurnLimit@ free Shop rerolls per round. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "TurnLimit": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/On-a-Roll-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On a Roll",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Edgy2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that start combat on the edge of your board gain @AD*100@% Attack Damage and @AS*100@% Attack Speed.",
      "effects": {
          "AD": 0.30000001192092896,
          "AS": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Edgy II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CosmicWisdom2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Buying XP now costs @InitialCost@ gold. Every time you buy XP this turn, increase the cost by @increase@ to a max of @MaxCost@. You can now reach level 10.",
      "effects": {
          "InitialCost": 1,
          "MaxCost": 4,
          "increase": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cosmic Wisdom II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Edgy3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that start combat on the edge of your board gain @AD*100@% Attack Damage and @AS*100@% Attack Speed.",
      "effects": {
          "AD": 0.4000000059604645,
          "AS": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Edgy III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ChemtechOverdrive",
      "associatedTraits": [],
      "composition": [],
      "desc": "Open a portal to Zaun on a random hex in the second row. Any unit that starts combat in the portal gains @Health@ Health and @AttackSpeed*100@% Attack Speed, and drops @Gold@ gold on death.",
      "effects": {
          "AttackSpeed": 0.4000000059604645,
          "Gold": 1,
          "Health": 500
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chemtech Overdrive",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Edgy1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that start combat on the edge of your board gain @AD*100@% Attack Damage and @AS*100@% Attack Speed.",
      "effects": {
          "AD": 0.20000000298023224,
          "AS": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Edgy I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MagicalJourneyPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "After each carousel, randomly gain @XP@ XP or @Rerolls@ free rerolls. Then, randomly gain one of these effects again.",
      "effects": {
          "Rerolls": 3,
          "XP": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magical Journey+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ExecutionerPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team executes enemies below @Healththreshold@% Health on hit. Executions have a @GoldChance@% chance to drop @goldgenerated@ gold.",
      "effects": {
          "GoldChance": 25,
          "HealthThreshold": 12,
          "goldgenerated": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Executioner III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PhreakyFridayHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Infinity Force. After @CombatNum@ player combats, gain another.<br><br><rules>Infinity Force: Artifact that offers tons of offensive and defensive stats</rules>",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Phreaky-Friday-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phreaky Friday",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Execute",
      "associatedTraits": [],
      "composition": [],
      "desc": "If a champion's target is below @hppercent@% Health, they deal @damageamp@% more damage.",
      "effects": {
          "DamageAmp": 30,
          "HPPercent": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Execute",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ThinkInsideTheBox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units that don't start combat on the edge of your board gain @AP*100@% Ability Power and @Health@ Health. ",
      "effects": {
          "AP": 0.15000000596046448,
          "Health": 75
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Think Inside The Box I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse1plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse I +",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LearningFromExperience1",
      "associatedTraits": [],
      "composition": [],
      "desc": "After player combat, gain @winxp@ XP if you won or @lossxp@ XP if you lost.",
      "effects": {
          "lossxp": 2,
          "winxp": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Patient Study I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GuildOfThieves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions always have Thieves' Gloves. Your current items are removed, and whenever you would gain an item, you instead gain @GoldAmount@ gold. ",
      "effects": {
          "GoldAmount": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guild of Thieves",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LearningFromExperience3",
      "associatedTraits": [],
      "composition": [],
      "desc": "After player combat, gain @winxp@ XP if you won or @lossxp@ XP if you lost.",
      "effects": {
          "lossxp": 6,
          "winxp": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Patient Study III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ActionSurge3",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @CombatDuration@ seconds of combat, your team gains @AttackSpeedBoost*100@% Attack Speed for @AttackSpeedDuration@ seconds.",
      "effects": {
          "AttackSpeedBoost": 1.2999999523162842,
          "AttackSpeedDuration": 6,
          "CombatDuration": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Action Surge III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ActionSurge2",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @CombatDuration@ seconds of combat, your team gains @AttackSpeedBoost*100@% Attack Speed for @AttackSpeedDuration@ seconds.",
      "effects": {
          "AttackSpeedBoost": 0.800000011920929,
          "AttackSpeedDuration": 6,
          "CombatDuration": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Action Surge II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse2plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse II +",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LearningPotential",
      "associatedTraits": [],
      "composition": [],
      "desc": "After each player combat, gain @Experience@ XP per @NumTraitsPerExp@ inactive traits on your board.<br><br><tftitemrules>Inactive Traits: @TFTUnitProperty.item:TFT9_Augment_LearningPotential_TraitNum@</tftitemrules>",
      "effects": {
          "Experience": 1,
          "NumTraitsPerExp": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Learning Potential",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_NutsAndBolts3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ item component(s) and @numreforgers@ Reforger(s).",
      "effects": {
          "NumComponents": 3,
          "NumReforgers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Nuts and Bolts III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_NutsAndBolts2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ item component(s) and @numreforgers@ Reforger(s).",
      "effects": {
          "NumComponents": 2,
          "NumReforgers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Nuts and Bolts II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_NutsAndBolts1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ item component(s) and @numreforgers@ Reforger(s).",
      "effects": {
          "NumComponents": 1,
          "NumReforgers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Nuts and Bolts I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GetJinxed",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, a Super Mega Death Rocket crashes into the largest clump of enemy units, dealing @Stage2Damage@-@Stage6Damage@ depending on the current stage. Enemies hit have their healing reduced by @GrievousWoundsPercent@% for @Duration@ seconds.",
      "effects": {
          "Delay": 8,
          "Duration": 15,
          "GrievousWoundsPercent": 33,
          "HexRadius": 2,
          "Stage2Damage": 250,
          "Stage3Damage": 300,
          "Stage4Damage": 350,
          "Stage5Damage": 425,
          "Stage6Damage": 500
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Get Jinxed!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BerserkI",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AttackSpeed*100@% Attack Speed per @MissingHealthPercent*100@% missing health.",
      "effects": {
          "AttackSpeed": 0.004999999888241291,
          "MissingHealthPercent": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Berserkers I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience3Plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 36
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download III+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PhreakyFridayPlusHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Infinity Force. After @CombatNum@ player combats, gain another.<br><br><rules>Infinity Force: Artifact that offers tons of offensive and defensive stats</rules>",
      "effects": {
          "CombatNum": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Phreaky-Friday-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phreaky Friday +",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BloodPrice2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @AttackSpeed*100@% Attack Speed for each @Health@ missing player health.",
      "effects": {
          "AttackSpeed": 0.03500000014901161,
          "Health": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blood-Price-II-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blood Price II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BloodPrice3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @AttackSpeed*100@% Attack Speed for each @Health@ missing player health.",
      "effects": {
          "AttackSpeed": 0.05000000074505806,
          "Health": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blood-Price-III-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blood Price III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BloodPrice1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @AttackSpeed*100@% Attack Speed for each @Health@ missing player health.",
      "effects": {
          "AttackSpeed": 0.02500000037252903,
          "Health": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blood-Price-I-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blood Price I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUp2HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp2Rounds@%)",
      "effects": {
          "BaseAS": 5,
          "IncreasePerRound": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ActionSurge",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @CombatDuration@ seconds of combat, your team gains @AttackSpeedBoost*100@% Attack Speed for @AttackSpeedDuration@ seconds.",
      "effects": {
          "AttackSpeedBoost": 0.5,
          "AttackSpeedDuration": 6,
          "CombatDuration": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Action Surge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LevelUpSilver",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain [newvarplz] XP now. When you buy XP, gain @XP@ more for free.",
      "effects": {
          "XP": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LevelUp1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Level Up?",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Coinpurse3plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coinpurse III +",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AirspeedVelocity3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @AttackSpeed*100@% Attack Speed.",
      "effects": {
          "AttackSpeed": 0.75
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Makeshift3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unburdened III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LongTimeCraftingHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @NumberOfCombats@ player combats, gain an Artifact anvil. <br><br><rules>The anvil offers 4 choices. Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Long-time-Crafting-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Latent Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Conditioning1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team permanently gains @healthperstack@ max Health every @secondspertrigger@ seconds in combat. Combat start: Your team gains @StartingHealth@ bonus max Health.",
      "effects": {
          "HealthPerStack": 5,
          "StartingHealth": 50,
          "secondspertrigger": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conditioning I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Conditioning2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team permanently gains @healthperstack@ max Health every @secondspertrigger@ seconds in combat. Combat start: Your team gains @StartingHealth@ bonus max Health.",
      "effects": {
          "HealthPerStack": 8,
          "StartingHealth": 75,
          "secondspertrigger": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conditioning II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Conditioning3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team permanently gains @healthperstack@ max Health every @secondspertrigger@ seconds in combat. Combat start: Your team gains @StartingHealth@ bonus max Health.",
      "effects": {
          "HealthPerStack": 12,
          "StartingHealth": 100,
          "secondspertrigger": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conditioning III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StrengthOfAges",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the end of each stage, all units on your board and bench gain @AD*100@% Attack Damage, @AP*100@% Ability Power, and @Health@ Health.",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 0.15000000596046448,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Strength Of Ages I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_EagleEye",
      "associatedTraits": [],
      "composition": [],
      "desc": "You know who your next opponent will be. Your units gain @ArmorAmount@ Armor or @MRAmount@ Magic Resist, and you can swap between the two during the planning phase.",
      "effects": {
          "ArmorAmount": 40,
          "MRAmount": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TFT_Augment_EagleEye.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eagle Eye",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Superstars",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team deals @BaseBonusDamage@% more damage, increased by @BonusDamagePer3Star@% for every 3-star champion on your team.",
      "effects": {
          "BaseBonusDamage": 10,
          "BonusDamagePer3Star": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Superstars",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience1Plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download 1+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BerserkII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AttackSpeed*100@% Attack Speed per @MissingHealthPercent*100@% missing health.",
      "effects": {
          "AttackSpeed": 0.009999999776482582,
          "MissingHealthPercent": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Berserkers II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_ManaJolt1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your team gains @startingmana@ Mana.",
      "effects": {
          "startingmana": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mana Jolt I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_ManaJolt2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your team gains @startingmana@ Mana.",
      "effects": {
          "startingmana": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mana Jolt II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_ManaJolt3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your team gains @startingmana@ Mana.",
      "effects": {
          "startingmana": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mana Jolt III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_NoScope",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units in the first two rows have their range reduced to a maximum of @RangeMax@ but gain @Armor@ Armor, @MagicResist@ Magic Resist, and @AD*100@% Attack Damage per hex of range lost.",
      "effects": {
          "AD": 0.3499999940395355,
          "Armor": 12,
          "MagicResist": 12,
          "RangeMax": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/NoScope.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "No Scope",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience2Plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 28
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download II+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ExecutionerPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team executes enemies below @Healththreshold@% Health on hit. Executions have a @GoldChance@% chance to drop @goldgenerated@ gold.",
      "effects": {
          "GoldChance": 20,
          "HealthThreshold": 8,
          "goldgenerated": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Executioner II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MediumEndShopping",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions appear in the first @NumLeveledUpShops@ slots of your shop as if you were 1 level higher. Gain @Gold@ gold.",
      "effects": {
          "Gold": 1,
          "NumLeveledUpShops": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HighEnd1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "High-End Shopping I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ACutAboveHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Deathblade. Champions holding this item have a @ProcChance*100@% chance to drop @Gold@ gold on kill.",
      "effects": {
          "Gold": 2,
          "ProcChance": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/A-Cut-Above-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "A Cut Above",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Amplify1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @CritDamage@% Critical Strike Damage.",
      "effects": {
          "CritDamage": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Amplify I",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Tinker",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Reforger and a Remover.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tinker",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random minor effect.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Champs",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for a champion.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @GoldAmount@ gold.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Hugify",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumHugs@ units to gain 500 Health for 1 round.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Rerolls",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumRerolls@ rerolls.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Dummies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumDummies@ Dummies for 1 round.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Wish_Scoreboard_Item",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for a temporary item for 1 round.",
      "effects": {
          "GoldAmount": 2,
          "NumChamps": 1,
          "NumDummies": 2,
          "NumHugs": 2,
          "NumRerolls": 2,
          "{99d2b8e8}": 3,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Hugify",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your highest %i:scaleHealth% champion grows, gaining @BonusHealth@&nbsp;%i:scaleHealth% for 1 round.",
      "effects": {
          "BonusHealth": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hugify",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SummonGolem",
      "associatedTraits": [],
      "composition": [],
      "desc": "Summon a large Golem equipped with defensive items for 1 round.",
      "effects": {
          "HealthBonus": "null"
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Golem",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MinorPolymorph",
      "associatedTraits": [],
      "composition": [],
      "desc": "Non-combat: A 1-cost champ you have transforms into a 2-cost.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Polymorph",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Assassin",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your highest %i:scaleAD% champion jumps to the enemy backline.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Assassin",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_LifeInsurance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Allied champions have a @DropChance*100@% chance to drop @Gold@ gold on death.",
      "effects": {
          "DropChance": 0.5,
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Life Insurance",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_DesperatePlea",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Reduce incoming player damage by @PlayerDmgReduction*100@%.",
      "effects": {
          "PlayerDmgReduction": 0.800000011920929
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Desperate Plea",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_RollingBones",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Rerolls@ Shop rerolls.",
      "effects": {
          "Rerolls": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Freeroller",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Hexplosion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: The first ally champion to die explodes, dealing @FlatDamage@ magic damage.",
      "effects": {
          "FlatDamage": 600,
          "NumUnits": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hexplosion",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_RentedGloves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary Thief's Gloves for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phantom Gloves",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Pyromania",
      "associatedTraits": [
          "TFT12_Pyro"
      ],
      "composition": [],
      "desc": "Gain @NumCinders@ Pyro infernal cinders.",
      "effects": {
          "NumCinders": 10
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pyromania",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_PureUtility",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Shred, Sunder, Wound, and Burn all enemies for @Duration@ seconds.",
      "effects": {
          "Duration": 15
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pure Utility",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_EscalatingXP",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @XPIncrease@ XP for each Study Hard you've bought this game.",
      "effects": {
          "XPIncrease": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Study Hard",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Barrier",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your team gains @ShieldAmount@ Shield, decaying over @DecayTime@ seconds.",
      "effects": {
          "DecayTime": 5,
          "ShieldAmount": 1000
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Barrier",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MagnumOpus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Lose @HealthCost@ player health. Gain a permanent 3-star 5-cost.",
      "effects": {
          "HealthCost": 66
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magnum Opus",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SilverFighting",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat start: Your team is immune to crowd control for @Duration@ seconds.",
      "effects": {
          "Duration": 8
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silver Guard",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BuggyCode",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Voidling for 1 round.",
      "effects": {
          "HealthPercent": 80
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Voidling",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_LesserDuplication",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a 1-star copy of a random champion you fielded last combat.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magic Mirror",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Aftershock",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next Combat: After @DelayTime@ seconds, stun all enemies for @StunDuration@ seconds.",
      "effects": {
          "DelayTime": 10,
          "StunDuration": 1.5
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Aftershock",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Polymorph",
      "associatedTraits": [],
      "composition": [],
      "desc": "Non-combat: A 2-cost champ you have transforms into a 3-cost.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Polymorph",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ShopGlitch",
      "associatedTraits": [],
      "composition": [],
      "desc": "For @Duration@ seconds, your shop refreshes for free every @RefreshTimer@ seconds.",
      "effects": {
          "Duration": 20,
          "RefreshTimer": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Animate Shop",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_CombatMastery",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Gain @XPIncrease@ XP for each enemy your team kills.",
      "effects": {
          "XPIncrease": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat Mastery",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheSun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Support anvil and an Artifact anvil. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Sun",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SummoningPortal",
      "associatedTraits": [
          "TFT12_Portal"
      ],
      "composition": [],
      "desc": "Gain a random Portal champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portal Hopping",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ShareTheWealth",
      "associatedTraits": [],
      "composition": [],
      "desc": "You and your opponent gain @Gold@ gold.",
      "effects": {
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Truce",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheChariot",
      "associatedTraits": [],
      "composition": [],
      "desc": "This round, rerolls cost you @RerollCost@ gold and buying XP costs you @XPCost@ gold.  ",
      "effects": {
          "RerollCost": 1,
          "XPCost": 3
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Chariot",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_LateBloomer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a permanent 3-star 1-cost champion and a Magnetic Remover.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Late Bloomer",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Manaflow",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your highest %i:scaleMana% champion's Mana cost is reduced by @MinusMana@&nbsp;%i:scaleMana% for 1 round.",
      "effects": {
          "MinusMana": 20
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Manaflow",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Blessing",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumItems@ full item held by a champion becomes Radiant for 1 round.",
      "effects": {
          "NumItems": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Radiantize",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MagicWall",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumDClaw@ temporary Dragon's Claw for 1 round.",
      "effects": {
          "NumDClaw": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phantom Claw",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_Judgement",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: If you win, gain @GoldOnWin@ gold; if you lose, gain @XPOnLose@ XP. ",
      "effects": {
          "GoldOnWin": 12,
          "XPOnLose": 20
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Judgement",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Artifactify",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumItems@ random items become Artifacts for 1 round.",
      "effects": {
          "NumItems": 4
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Artifactinate",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Rushdown",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your highest %i:scaleAS% champion gains @BonusAS*100@% decaying %i:scaleAS% over @Duration@ sec for 1 round.",
      "effects": {
          "BonusAS": 1.2000000476837158,
          "Duration": 5
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rushdown",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_YordleSpirit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your team has a @DodgeChance@% chance to dodge attacks for @DodgeDuration@ seconds.",
      "effects": {
          "DodgeChance": 99,
          "DodgeDuration": 4
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Yordle Spirit",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheLovers",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a 5-cost champion and a 2* 2-cost champion that share traits.",
      "effects": {
          "{2f386bda}": 2,
          "{a8f798b3}": 5
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Lovers",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random effect.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Hugify",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumHugs@ units to gain 500 Health for 1 round.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Dummies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumDummies@ Dummies for 1 round.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Rerolls",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumRerolls@ rerolls.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Champs",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @NumChamps@ champions.",
      "effects": {
          "GoldAmount": 10,
          "NumChamps": 2,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for @GoldAmount@ gold.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BigWish_Scoreboard_Item",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wished for a temporary Support item for 1 round.",
      "effects": {
          "GoldAmount": 10,
          "NumDummies": 4,
          "NumHugs": 5,
          "NumRerolls": 6,
          "{16aa1d90}": 4,
          "{360dbb9c}": 5,
          "{c7cda7f4}": 500
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Wish",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Distraction",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Target Dummy for @NumRounds@ round.",
      "effects": {
          "NumRounds": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Dummy",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AnimateBench",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Every 6 seconds, a champion joins combat from your bench.",
      "effects": {
          "{db565bb0}": 6
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Animate Bench",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Recruitment",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random Emblem.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Emblem",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_WinningInvestment",
      "associatedTraits": [],
      "composition": [],
      "desc": "If you win your next player combat, gain @GoldOnWin@ gold.",
      "effects": {
          "GoldOnWin": 3
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Gambit",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_CloakOfBigSurprise",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumToGive@ champions without items gain a Suspicious Trenchcoat for 1 round.",
      "effects": {
          "NumToGive": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Big Surprise!",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MinorShield",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Grant @ShieldAmount@ Shield to your 1-star champions.",
      "effects": {
          "ShieldAmount": 300
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Starless Shield",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheMoon",
      "associatedTraits": [],
      "composition": [],
      "desc": "Increase your 5-cost odds by @IncreasedOddsPercent@% permanently. ",
      "effects": {
          "IncreasedOddsPercent": 4,
          "LIMIT": 5
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Moon",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_UrfsDelight",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Spatula.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Spatula",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SinisterDeal",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @GoldToGain@ gold. This Charm costs @HealthToLose@ player health.",
      "effects": {
          "GoldToGain": 2,
          "HealthToLose": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sinister Deal",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Shrinkify",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your highest %i:scaleAS% champion shrinks, gaining @BonusAS*100@% %i:scaleAS% for 1 round.",
      "effects": {
          "BonusAS": 0.25
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shrinkify",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheEmperor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Xerath gains @XerathDamageAmp*100@% Damage Amp and his allies gain @TeamDamageAmp*100@% Damage Amp.",
      "effects": {
          "TeamDamageAmp": 0.10000000149011612,
          "XerathDamageAmp": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Emperor",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BackrowStar",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: A random back row champion gains @PercentAS*100@% %i:scaleAS% for @Duration@ seconds.",
      "effects": {
          "Duration": 7,
          "PercentAS": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Backrow Star",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_DieRoll",
      "associatedTraits": [],
      "composition": [],
      "desc": "Roll a die. Gain gold equal to the result.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Die Roll",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MimicryMinor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Lesser Champion Duplicator.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Minor Mimicry",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_EscalatingHeal",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @HealIncrease@ Health for each {{ TFT12_Zap_EscalatingHeal_Name }} you have bought this game.",
      "effects": {
          "HealIncrease": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Train Hard",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Enhance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with champions 1 cost higher.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Enhance",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Blacksmithing",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a component anvil.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Anvil",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Assembly",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a copy of each 1-cost champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Assembly",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MajorGambit",
      "associatedTraits": [],
      "composition": [],
      "desc": "If you win your next player combat, gain @GoldOnWin@ gold.",
      "effects": {
          "GoldOnWin": 10
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Gambit",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_CloakOfSurprise",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumToGive@ champion without items gains a Suspicious Trenchcoat for 1 round.",
      "effects": {
          "NumToGive": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Surprise!",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_IroncladSpirit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BonusArmor@ Armor for 1 round.",
      "effects": {
          "BonusArmor": 30
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ironclad Spirit",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheWorld",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a copy of every 4-cost champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The World",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SupportStaff",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Support Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Support",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MoonlightRitual",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: A random 1 or 2 cost champion stars up.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Moonlight Ritual",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MysticSpirit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BonusMR@ Magic Resist for 1 round.",
      "effects": {
          "BonusMR": 30
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mystic Spirit",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_DoubleDummy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumTargetDummies@ Target Dummies for 1 round.",
      "effects": {
          "NumTargetDummies": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Dummies",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MeteorStorm",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Burn and deal @MaxHealthDamage*100@% max Health magic damage to @EnemyCount@ enemies.",
      "effects": {
          "BurnDuration": 10,
          "EnemyCount": 4,
          "MaxHealthDamage": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Meteor Storm",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SnapFreeze",
      "associatedTraits": [
          "TFT12_Frost"
      ],
      "composition": [],
      "desc": "Next combat: Winter ice soldiers gain @PercentExtraHealth*100@% more Health.",
      "effects": {
          "PercentExtraHealth": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frosty Fortitude",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Zoomify",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @TooltipMoveSpeedPct@% movement speed for 1 round.",
      "effects": {
          "MoveSpeed": 1000,
          "TooltipMoveSpeedPct": 200
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zoomify",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Premonition",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reveal who your next opponent is.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crystal Ball",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_HailToTheQueen",
      "associatedTraits": [
          "TFT12_Faerie"
      ],
      "composition": [],
      "desc": "Next combat: If you win, gain a copy of your highest cost Faerie.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Queen's Gambit",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GiantGlamour",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @NumToGive@ non-removable Giant's Belts for 1 round.",
      "effects": {
          "NumToGive": 6
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bunch-o'-Belts",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheTower",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Lightning Dummy for 1 round that strikes nearby enemies.",
      "effects": {
          "HPMultiplier": 4,
          "{743cab9a}": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Tower",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Shivify",
      "associatedTraits": [],
      "composition": [],
      "desc": "All your items transform into Statikk Shiv for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shivinate",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_TreasureHunter",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumToGive@ champion without items gain an Unstable Treasure Chest for 1 round.",
      "effects": {
          "NumToGive": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Treasure Hunter",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Leadership",
      "associatedTraits": [],
      "composition": [],
      "desc": "A champion holding 3 completed items gains @HPToGain@ Health permanently.",
      "effects": {
          "HPToGain": 300
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Leadership",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Counterspell",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Mana Reave all enemies.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Counterspell",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Golem",
      "associatedTraits": [],
      "composition": [],
      "desc": "Summon a Sentinel with an emblem of your most active trait for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Sentinel",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_StickyFingers",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: copy a component from the 1st enemy your team kills.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sticky Fingers",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Discount",
      "associatedTraits": [],
      "composition": [],
      "desc": "This round, the next champion you buy is free.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Discount",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheMagician",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your shop with all Charms. You can buy 1 this round, which casts twice.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Magician",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Artifactor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Artifact",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AncientRitual",
      "associatedTraits": [
          "TFT12_Eldritch"
      ],
      "composition": [],
      "desc": "Next combat: Your Eldritch God gains @ASBoost*100@% %i:scaleAS% and @HealthBoost*100@% %i:scaleHealth% on takedown.",
      "effects": {
          "ASBoost": 0.20000000298023224,
          "HealthBoost": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eldritch Hunger",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_Death",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kill everything. Profit.",
      "effects": {
          "StunDuration": 3,
          "{1f3e5e33}": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Death",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MajorPolymorph",
      "associatedTraits": [],
      "composition": [],
      "desc": "Non-combat: A 4-cost champ you have transforms into a 5-cost.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Polymorph",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_PhantomArtifact",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary Artifact for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phantom Artifact",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AllThrees",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with all 3-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Threes",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_RunRun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @PercentAS*100@% Attack Speed for 1 round. ",
      "effects": {
          "PercentAS": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rite of Speed",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_UltraAscension",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: At @DelayTime@ seconds, your team gains @DamageAmpPercent@% Damage Amp.",
      "effects": {
          "DamageAmpPercent": 300,
          "DelayTime": 22
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ultra Ascension",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Truce",
      "associatedTraits": [],
      "composition": [],
      "desc": "You and your next opponent gain @GoldToGain@ gold.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Truce",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_PieceOfCake",
      "associatedTraits": [
          "TFT12_Sugarcraft"
      ],
      "composition": [],
      "desc": "Gain @StepsToGain@ sugar for your Sugarcraft cake.",
      "effects": {
          "StepsToGain": 25
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Piece of Cake",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Batnap",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Get a 1-star copy of the first enemy champion to die. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Copycat",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_MimicryMajor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Champion Duplicator.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Major Mimicry",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_QuickBounty",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Gain an item component if you win in under @DelayTime@ seconds.",
      "effects": {
          "DelayTime": 15
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Quick Bounty",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AllFives",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with all 5-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Fives",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_LightningStrike",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Deal 10% max Health as true damage to all enemies.",
      "effects": {
          "MaxHPDamage": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lightning Strike",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Poof",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your units execute enemies that fall below @ExecuteThreshold@ Health.",
      "effects": {
          "ExecuteThreshold": 200
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reaper",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_QuickBurn",
      "associatedTraits": [
          "TFT12_Dragon"
      ],
      "composition": [],
      "desc": "Next combat: Dragon attacks deal an extra @PercentBurn*100@% max Health true damage.",
      "effects": {
          "PercentBurn": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spitfire",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Infliction",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Chill, Burn, Shred, and Sunder enemies for @DebuffDuration@ seconds.",
      "effects": {
          "DebuffDuration": 8
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Infliction",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GreedyDilemma",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Gain @Gold@ gold. If your opponent also bought this, lose @HealthLoss@ player health instead.",
      "effects": {
          "Gold": 1,
          "HealthLoss": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Greedy Dilemma",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_TreasureParty",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumUnits@ champions without items gain @NumToGive@ Unstable Treasure Chests for 1 round.",
      "effects": {
          "NumToGive": 2,
          "NumUnits": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Treasure Party",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Masterwork",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Masterwork Upgrade.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Masterwork",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ScopedWeapons",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions in your back 2 rows gain @BonusRange@ Attack Range for 1 round.",
      "effects": {
          "BonusRange": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scope Expansion",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GoldenArmor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @HealthBoost@ %i:scaleHealth% for every @GoldPerBoost@ gold you have for 1 round. ",
      "effects": {
          "GoldPerBoost": 10,
          "HealthBoost": 50
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Armor",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ComfortFood",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @InitialHeal@ player health. Gain @OnLossHeal@ more if you lose next player combat.",
      "effects": {
          "InitialHeal": 1,
          "OnLossHeal": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Comfort Food",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Dehance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with champions 1 cost lower.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dehance",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AllTwos",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with all 2-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Twos",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Tremors",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start and every @DelayTime@ seconds, stun all enemies for @StunDuration@ seconds.",
      "effects": {
          "DelayTime": 8,
          "StunDuration": 1.25
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tremors",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_IncomingClass",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with all 1-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Ones",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_TheCount",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with a 1, 2, 3, 4, and 5 cost champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Count",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Stealthy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: @NumUnits@ units in your back row are untargetable for @Duration@ seconds.",
      "effects": {
          "Duration": 8,
          "NumUnits": 3
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stealthy",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_CoinFlip",
      "associatedTraits": [],
      "composition": [],
      "desc": "50% chance to gain 1 gold for each Coin Flip you've used.",
      "effects": {
          "GoldChance": 0.6600000262260437,
          "GoldToGain": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Coin Flip",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Quickening",
      "associatedTraits": [
          "TFT12_Chrono"
      ],
      "composition": [],
      "desc": "Next combat: Chrono champions gain +30% %i:scaleAS% after countdown.",
      "effects": {
          "ASBoost": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Quickening",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SupremeArcana",
      "associatedTraits": [
          "TFT12_Arcana"
      ],
      "composition": [],
      "desc": "Your High Arcana champion gains @BuffAmount*100@% Damage Amp and Durability for 1 round.",
      "effects": {
          "BuffAmount": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Supreme Arcana",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GoldenBlessing",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Dummy for 1 round. Your Dummies drop gold as they take damage.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Dummy",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ShieldWall",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your team gains @Armor@ Armor.",
      "effects": {
          "Armor": 10
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shield Wall",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_ConjureFryingPan",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Frying Pan.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Conjure Frying Pan",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GearSwap",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary Magnetic Remover and a Reforger for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gear Swap",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_DressDown",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: @ShredSunder@% Shred and Sunder all enemies for @Duration@ seconds.",
      "effects": {
          "Duration": 8,
          "ShredSunder": 30
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dress Down",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Salvager",
      "associatedTraits": [],
      "composition": [],
      "desc": "Any champions you bench this turn have items removed and broken apart.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_MiscWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Salvager",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_SummonDragon",
      "associatedTraits": [],
      "composition": [],
      "desc": "Summon a @Health@ Health Dragon for 1 round.",
      "effects": {
          "AttackRange": 2,
          "DamagePercent": 0.30000001192092896,
          "Health": 3200
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Summon Dragon",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Earthquake",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Stun all enemies for 2 seconds.",
      "effects": {
          "StunDuration": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Earthquake",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_UltraBuggy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your 1st @MaxSpawn@ front row units spawn a voidling after death.",
      "effects": {
          "HealthPercent": 60,
          "MaxSpawn": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spawn Swarm",
      "unique": false
  },
  {
      "apiName": "TFT12_XerathZap_TheStar",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: 1-stars star up. Their allies gain @Shield@ Shield and @AP@ %i:scaleAP%.",
      "effects": {
          "AP": 20,
          "Shield": 200
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_XerathWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Star",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_PhantomEmblem",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary emblem of your most active trait for 1 round.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phantom Emblem",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_FireFire",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Burn and Wound enemies for @Duration@ seconds.",
      "effects": {
          "Duration": 10
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sunfire Sorcery",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_RentedBramble",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary Bramble Vest for 1 round.",
      "effects": {
          "{746592ee}": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phantom Vest",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_BusyBees",
      "associatedTraits": [
          "TFT12_Honeymancy"
      ],
      "composition": [],
      "desc": "Your Bees gain @BonusAS*100@% Attack Speed this round.",
      "effects": {
          "BonusAS": 0.25
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Busy Bees",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_HocusPocus",
      "associatedTraits": [
          "TFT12_Witchcraft"
      ],
      "composition": [],
      "desc": "Next combat: Witches gain @WitchAPBoost@ Ability Power.",
      "effects": {
          "WitchAPBoost": 25
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_TraitsWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hocus Pocus",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_HotStreak",
      "associatedTraits": [],
      "composition": [],
      "desc": "Non-combat: Add @StreakAdjust@ to your streak.",
      "effects": {
          "StreakAdjust": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hot Streak",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_GuildOfThieves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumGloves@ temporary Thief's Gloves for 1 round.",
      "effects": {
          "NumGloves": 3
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guild of Thieves",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Paragon",
      "associatedTraits": [],
      "composition": [],
      "desc": "Next combat: Your team's physical damage is dealt as magic damage",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Paragon",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Desperation",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumRerolls@ Shop rerolls. This Charm costs @HPToLose@ player health.",
      "effects": {
          "HPToLose": 4,
          "NumRerolls": 6
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sinister Shop",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Lifeline",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumGold@ gold. Your team gains @HPToGain@ Health for 1 round.",
      "effects": {
          "HPToGain": 50,
          "NumGold": 1
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Find",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_AllFours",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reroll your Shop with all 4-cost champions.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_EconWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Fours",
      "unique": false
  },
  {
      "apiName": "TFT12_Zap_Scrappy",
      "associatedTraits": [],
      "composition": [],
      "desc": "@NumItems@ champions without items gain a temporary full item.",
      "effects": {
          "NumItems": 2
      },
      "from": null,
      "icon": "ASSETS/UX/TFT/Hud/ZAPS/Wands/ZAPS_ScoreboardBadge_CombatWand_Self.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scrappy",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_YorickCarry",
      "associatedTraits": [
          "TFT11_Behemoth",
          "TFT11_Umbral"
      ],
      "composition": [],
      "desc": "Gain a Yorick. Your strongest Yorick gains @MaxHealthPct*100@% max Health and additionally deals @MaxHealthDmg*100@% of his max Health with his Ability.",
      "effects": {
          "MaxHealthDmg": 0.20000000298023224,
          "MaxHealthPct": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MidnightSiphon_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Midnight Siphon",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DynamicDuo",
      "associatedTraits": [],
      "composition": [],
      "desc": "Get a random 5-cost champion and a random champion that shares a trait with them. Get @Gold@ gold.",
      "effects": {
          "Gold": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DynamicDuo_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dynamic Duo",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Behemoth",
      "associatedTraits": [
          "TFT11_Behemoth"
      ],
      "composition": [],
      "desc": "Combat start: Your strongest Behemoth gains @Health*100@% Health. When other Behemoths die, they transfer @DefenseRatio*100@% of their Armor and Magic Resist to it. Gain a Malphite and&nbsp;a&nbsp;Yorick. ",
      "effects": {
          "DefenseRatio": 0.20000000298023224,
          "Health": 0.20000000298023224,
          "SizeIncrease": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RaidBoss_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Raid Boss",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BrawlerCrown",
      "associatedTraits": [
          "TFT11_Bruiser"
      ],
      "composition": [],
      "desc": "Gain a Bruiser Emblem, a Bloodthirster, and an Aatrox.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Bruiser_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bruiser Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BehemothCrest",
      "associatedTraits": [
          "TFT11_Behemoth"
      ],
      "composition": [],
      "desc": "Gain a Behemoth Emblem, a Shen, and a Thresh.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Behemoth_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Behemoth Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ExaltedCrest",
      "associatedTraits": [
          "TFT11_Exalted"
      ],
      "composition": [],
      "desc": "Gain an Exalted Emblem.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Exalted_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Exalted Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DragonlordCrown",
      "associatedTraits": [
          "TFT11_Dragonlord"
      ],
      "composition": [],
      "desc": "Gain a Dragonlord Emblem, a Guinsoo's Rageblade, a Janna, and a Diana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Dragonlord_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dragonlord Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_PorcelainCrest",
      "associatedTraits": [
          "TFT11_Porcelain"
      ],
      "composition": [],
      "desc": "Gain a Porcelain Emblem and an Amumu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Porcelain_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Porcelain Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Trickshot",
      "associatedTraits": [
          "TFT11_Trickshot"
      ],
      "composition": [],
      "desc": "Trickshots bounce @ExtraBounces@ extra time for @DamageReduction*100@% of original damage. Gain a Sivir and Teemo.",
      "effects": {
          "DamageReduction": 0.4000000059604645,
          "ExtraBounces": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LuckyRicochet_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Ricochet",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_MythicCrest",
      "associatedTraits": [
          "TFT11_Mythic"
      ],
      "composition": [],
      "desc": "Gain a Mythic Emblem and a Neeko.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Mythic_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mythic Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Calltochaos",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a powerful and random reward.<br><br>Reward: @TFTUnitProperty.item:TFT11_Augment_CallToChaos@",
      "effects": {
          "Gold": 58,
          "NumEmblems": 5,
          "Rerolls": 40,
          "XP": 64,
          "numtg": 3,
          "{5edfa63d}": 20,
          "{8c58ac06}": 3,
          "{8f15cad2}": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CallToChaos_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Call to Chaos",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ShenCarryPlus",
      "associatedTraits": [
          "TFT11_Behemoth",
          "TFT11_Ghostly"
      ],
      "composition": [],
      "desc": "Gain a 2-star Shen. Your strongest Shen has +@IncRange@ Range and his Ability does @damageamp*100@% increased damage.",
      "effects": {
          "DamageAmp": 0.8500000238418579,
          "IncRange": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EtherealBlades_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ethereal Blades+",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_StoryweaverCrest",
      "associatedTraits": [
          "TFT11_Storyweaver"
      ],
      "composition": [],
      "desc": "Gain a Storyweaver Emblem and a Garen.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Storyweaver_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Storyweaver Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_GarenCarry",
      "associatedTraits": [
          "TFT11_Warden",
          "TFT11_Storyweaver"
      ],
      "composition": [],
      "desc": "Gain a 2-star Garen. Your strongest Garen's Ability now grants stacking max Health instead of Shield. If he has more max Health than his target, his Ability deals @damageamp*100@% bonus true damage.",
      "effects": {
          "DamageAmp": 0.44999998807907104
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/StoriedChampion_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Storied Champion",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SageCrown",
      "associatedTraits": [
          "TFT11_Sage"
      ],
      "composition": [],
      "desc": "Gain a Sage Emblem, an Adaptive Helm, a Zyra, and a Diana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Sage_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sage Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_NeekoCarry",
      "associatedTraits": [
          "TFT11_Heavenly",
          "TFT11_Mythic",
          "TFT11_Arcanist"
      ],
      "composition": [],
      "desc": "Gain a Neeko. Your strongest Neeko's Ability heals @healamp*100@% more, and slams for @damageamp*100@% increased damage. Each cast increases the Ability radius by @radius@.",
      "effects": {
          "DamageAmp": 0.3499999940395355,
          "healamp": 0.3499999940395355,
          "radius": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DropBlossom_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Drop Blossom!",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_HeavenlyCrest",
      "associatedTraits": [
          "TFT11_Heavenly"
      ],
      "composition": [],
      "desc": "Gain a Heavenly Emblem and&nbsp;a&nbsp;Neeko.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Heavenly_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Heavenly Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DuelistCrest",
      "associatedTraits": [
          "TFT11_Duelist"
      ],
      "composition": [],
      "desc": "Gain a Duelist Emblem and a Qiyana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Duelist_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Duelist Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Duelist",
      "associatedTraits": [
          "TFT11_Duelist"
      ],
      "composition": [],
      "desc": "Your Duelists start combat with @StartingStacks@ stacks. At max stacks, they gain @Omnivamp*100@%&nbsp;Omnivamp. Gain a Darius and&nbsp;a&nbsp;Yasuo.",
      "effects": {
          "Omnivamp": 0.10000000149011612,
          "StartingStacks": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gadget-Expert-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Extended Duel",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_FatedCrown",
      "associatedTraits": [
          "TFT11_Fated"
      ],
      "composition": [],
      "desc": "Gain a Fated Emblem, a Sunfire Cape, and a Kindred.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Fated_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fated Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Warden",
      "associatedTraits": [
          "TFT11_Warden"
      ],
      "composition": [],
      "desc": "Wardens' start of combat damage reduction is increased by @TempDamageReduction@%. @DamageReduction*100@% of damage dealt to non-Wardens is instead distributed across your Wardens. Get a Gnar and Amumu.",
      "effects": {
          "DamageReduction": 0.20000000298023224,
          "TempDamageReduction": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SpiritGuardians_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spirit Guardians",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ShenCarry",
      "associatedTraits": [
          "TFT11_Behemoth",
          "TFT11_Ghostly"
      ],
      "composition": [],
      "desc": "Gain a Shen. Your strongest Shen has +@IncRange@ Range and his Ability deals @damageamp*100@% increased damage.",
      "effects": {
          "DamageAmp": 0.8500000238418579,
          "IncRange": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EtherealBlades_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ethereal Blades",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_AtWhatCost",
      "associatedTraits": [],
      "composition": [],
      "desc": "Immediately go to level @Level@ and gain @XP@ XP. You don't get to choose your future augments.",
      "effects": {
          "Gold": "null",
          "Level": 6,
          "XP": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AtWhatCost_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "At What Cost",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ArcanistCrown",
      "associatedTraits": [
          "TFT11_Arcanist"
      ],
      "composition": [],
      "desc": "Gain an Arcanist Emblem, a Statikk Shiv, and a Zoe.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Arcanist_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcanist Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BehemothCrown",
      "associatedTraits": [
          "TFT11_Behemoth"
      ],
      "composition": [],
      "desc": "Gain a Behemoth Emblem, a Sunfire Cape, a Yorick, and a Thresh.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Behemoth_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Behemoth Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Heavenly",
      "associatedTraits": [
          "TFT11_Heavenly"
      ],
      "composition": [],
      "desc": "At the start of every stage, including this one, gain @BaseRerolls@ free rerolls + @BonusRerolls@ for each of your Heavenly champions. Rerolls last this turn only. Gain a Kha'Zix and a Malphite.",
      "effects": {
          "BaseRerolls": 4,
          "BonusRerolls": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DivineRolls_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Divine Rolls",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_InkshadowCrest",
      "associatedTraits": [
          "TFT11_InkShadow"
      ],
      "composition": [],
      "desc": "Gain an Inkshadow Emblem and&nbsp;a&nbsp;Senna.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Inkshadow_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Inkshadow Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_WardenCrown",
      "associatedTraits": [
          "TFT11_Warden"
      ],
      "composition": [],
      "desc": "Gain a Warden Emblem, a Redemption and an Amumu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Warden_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warden Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_MythicCrown",
      "associatedTraits": [
          "TFT11_Mythic"
      ],
      "composition": [],
      "desc": "Gain a Mythic Emblem, a Guardbreaker, and a Neeko.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Mythic_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mythic Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_KobukoCarry",
      "associatedTraits": [
          "TFT11_Fortune",
          "TFT11_Bruiser"
      ],
      "composition": [],
      "desc": "Gain a 2-star Kobuko. Your strongest Kobuko's Ability deals @damageamp*100@% damage. If Kobuko kills an enemy, they have a @goldchance@% chance to drop&nbsp;@gold@&nbsp;gold.",
      "effects": {
          "DamageAmp": 2.25,
          "Gold": 1,
          "GoldChance": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LuckyPaws_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Paws",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_StoryweaverCrown",
      "associatedTraits": [
          "TFT11_Storyweaver"
      ],
      "composition": [],
      "desc": "Gain a Storyweaver Emblem, a Protector's Vow, and a Garen.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Storyweaver_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Storyweaver Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BrawlerCrest",
      "associatedTraits": [
          "TFT11_Bruiser"
      ],
      "composition": [],
      "desc": "Gain a Bruiser Emblem and&nbsp;a&nbsp;Tahm Kench.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Bruiser_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bruiser Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Umbral",
      "associatedTraits": [
          "TFT11_Umbral"
      ],
      "composition": [],
      "desc": "Umbral champions deal @BonusDamage*100@% more damage every second they continue attacking an enemy. Resets when they swap targets. Gain a Darius and a Yorick.",
      "effects": {
          "BonusDamage": 0.03500000014901161
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WrathOfTheMoon_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wrath of the Moon",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_NeekoCarryPlus",
      "associatedTraits": [
          "TFT11_Heavenly",
          "TFT11_Mythic",
          "TFT11_Arcanist"
      ],
      "composition": [],
      "desc": "Gain a 2-star Neeko. Your strongest Neeko's Ability heals @healamp*100@% more, and slams for @damageamp*100@% more damage. Each cast increases the Ability radius by @radius@.",
      "effects": {
          "DamageAmp": 0.3499999940395355,
          "healamp": 0.3499999940395355,
          "radius": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DropBlossom_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Drop Blossom!+",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_FortuneCrest",
      "associatedTraits": [
          "TFT11_Fortune"
      ],
      "composition": [],
      "desc": "Gain a Fortune Emblem and&nbsp;a&nbsp;Tristana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Fortune_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fortune Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_UmbralCrest",
      "associatedTraits": [
          "TFT11_Umbral"
      ],
      "composition": [],
      "desc": "Gain an Umbral Emblem and&nbsp;a&nbsp;Yorick.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Umbral_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Umbral Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Invoker",
      "associatedTraits": [
          "TFT11_Invoker"
      ],
      "composition": [],
      "desc": "Whenever an Invoker casts, grant the lowest Health ally Shield equal to @ManaShield*100@% of Mana spent. Gain a Janna.",
      "effects": {
          "ManaShield": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ManaShield_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mana Shield",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_YorickCarryPlus",
      "associatedTraits": [
          "TFT11_Behemoth",
          "TFT11_Umbral"
      ],
      "composition": [],
      "desc": "Gain a 2-star Yorick. Your strongest Yorick gains @MaxHealthPct*100@% max Health and additionally deals @MaxHealthDmg*100@% of his max Health with his Ability.",
      "effects": {
          "MaxHealthDmg": 0.20000000298023224,
          "MaxHealthPct": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MidnightSiphon_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Midnight Siphon+",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_InvokerCrown",
      "associatedTraits": [
          "TFT11_Invoker"
      ],
      "composition": [],
      "desc": "Gain an Invoker Emblem, a Rabadon's Deathcap, and a Janna.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Invoker_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invoker Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Porcelain",
      "associatedTraits": [
          "TFT11_Porcelain"
      ],
      "composition": [],
      "desc": "Porcelains' attacks grant @manarestore@ bonus Mana. While boiling, their attacks also Burn and Wound. Gain&nbsp;a&nbsp;Lux and an Amumu.",
      "effects": {
          "ManaRestore": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BoilingPoint_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Boiling Point",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Dragonlord",
      "associatedTraits": [
          "TFT11_Dragonlord"
      ],
      "composition": [],
      "desc": "After the dragon strikes, Dragonlords deal @BonusDamage*100@% bonus true damage. Gain a Janna and Diana.",
      "effects": {
          "BonusDamage": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EnterTheDragon_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Enter the Dragon",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Inkshadow",
      "associatedTraits": [
          "TFT11_InkShadow"
      ],
      "composition": [],
      "desc": "Open an armory that grants an extra Inkshadow item while the trait is active. Gain a Jax and an Aatrox.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PassingTheCanvas_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Full Sleeve",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ExaltedCrown",
      "associatedTraits": [
          "TFT11_Exalted"
      ],
      "composition": [],
      "desc": "Gain an Exalted Emblem and a Redemption.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Exalted_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Exalted Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DryadCrest",
      "associatedTraits": [
          "TFT11_Dryad"
      ],
      "composition": [],
      "desc": "Gain a Dryad Emblem and a Gnar.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Dryad_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dryad Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Bruiser",
      "associatedTraits": [
          "TFT11_Bruiser"
      ],
      "composition": [],
      "desc": "Bruisers heal @HealthPercent*100@% of their max Health every @HealRate@ second. Gain a Kobuko and&nbsp;a&nbsp;Aatrox.",
      "effects": {
          "HealRate": 1,
          "HealthPercent": 0.019999999552965164
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WellFed_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Well Fed",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DragonlordCrest",
      "associatedTraits": [
          "TFT11_Dragonlord"
      ],
      "composition": [],
      "desc": "Gain a Dragonlord Emblem, a Janna, and a Diana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Dragonlord_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dragonlord Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Ghostly",
      "associatedTraits": [
          "TFT11_Ghostly"
      ],
      "composition": [],
      "desc": "Enemies that die while haunted by Ghostly pass @BonusHaunts@ extra spectre to a nearby enemy. Gain an Aatrox and&nbsp;a&nbsp;Shen.",
      "effects": {
          "BonusHaunts": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HauntedHouse_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Haunted House",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Storyweaver",
      "associatedTraits": [
          "TFT11_Storyweaver"
      ],
      "composition": [],
      "desc": "Every @TakeDowns@ takedowns, Storyweaver Kayle permanently gains @AP@ Ability Power and @Health@ Health. Gain a Garen and Riven.",
      "effects": {
          "AP": 3,
          "Health": 18,
          "TakeDowns": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CallToAdventure_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Call to Adventure",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_FortuneCrown",
      "associatedTraits": [
          "TFT11_Fortune"
      ],
      "composition": [],
      "desc": "Gain a Fortune Emblem, a Giant Slayer, and a Tristana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Fortune_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fortune Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_GhostlyCrest",
      "associatedTraits": [
          "TFT11_Ghostly"
      ],
      "composition": [],
      "desc": "Gain a Ghostly Emblem and a Shen.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Ghostly_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ghostly Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ArcanistCrest",
      "associatedTraits": [
          "TFT11_Arcanist"
      ],
      "composition": [],
      "desc": "Gain an Arcanist Emblem and a Zoe.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Arcanist_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcanist Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SageCrest",
      "associatedTraits": [
          "TFT11_Sage"
      ],
      "composition": [],
      "desc": "Gain a Sage Emblem, a Zyra, and a Diana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Sage_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sage Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_AltruistCrest",
      "associatedTraits": [
          "TFT11_Altruist"
      ],
      "composition": [],
      "desc": "Gain an Altruist Emblem and a Riven.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Altruist_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Altruist Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_FatedCrest",
      "associatedTraits": [
          "TFT11_Fated"
      ],
      "composition": [],
      "desc": "Gain a Fated Emblem and a Kindred.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Fated_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fated Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Arcanist",
      "associatedTraits": [
          "TFT11_Arcanist"
      ],
      "composition": [],
      "desc": "Arcanists grant @APtoShieldRatio*100@% of their combined Ability Power as bonus Health to your Training Dummies. Get a Zoe and a Training Dummy.",
      "effects": {
          "APtoShieldRatio": 2.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MindOverMatter_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mind Over Matter",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_PorcelainCrown",
      "associatedTraits": [
          "TFT11_Porcelain"
      ],
      "composition": [],
      "desc": "Gain a Porcelain Emblem, an Adaptive Helm, and an Amumu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Porcelain_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Porcelain Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ReaperCrest",
      "associatedTraits": [
          "TFT11_Reaper"
      ],
      "composition": [],
      "desc": "Gain a Reaper Emblem and&nbsp;a&nbsp;Kindred.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Reaper_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reaper Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SniperCrest",
      "associatedTraits": [
          "TFT11_Sniper"
      ],
      "composition": [],
      "desc": "Gain a Sniper Emblem and an Aphelios.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Sniper_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sniper Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_InkshadowCrown",
      "associatedTraits": [
          "TFT11_InkShadow"
      ],
      "composition": [],
      "desc": "Gain an Inkshadow Emblem, an Evenshroud, and a Senna.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Inkshadow_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Inkshadow Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_WardenCrest",
      "associatedTraits": [
          "TFT11_Warden"
      ],
      "composition": [],
      "desc": "Gain a Warden Emblem, a Jax, and an Amumu.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Warden_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warden Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_InvokerCrest",
      "associatedTraits": [
          "TFT11_Invoker"
      ],
      "composition": [],
      "desc": "Gain an Invoker Emblem and a Janna.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crest_Invoker_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invoker Crest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DryadCrown",
      "associatedTraits": [
          "TFT11_Dryad"
      ],
      "composition": [],
      "desc": "Gain a Dryad Emblem, a Titans Resolve, and a Gnar.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Dryad_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dryad Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Sniper",
      "associatedTraits": [
          "TFT11_Sniper"
      ],
      "composition": [],
      "desc": "Snipers gain @AttackSpeed*100@% Attack Speed. Gain a Caitlyn and a Kog'Maw. After Snipers have attacked a total distance of @Distance@ hexes, gain a Sniper's Focus. (Current:&nbsp;@TFTUnitProperty.item:TFT11_Augment_Sniper_DistanceShot@)",
      "effects": {
          "AttackSpeed": 0.15000000596046448,
          "Distance": 1200
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LongShot_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Long Shot",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Exalted",
      "associatedTraits": [
          "TFT11_Exalted"
      ],
      "composition": [],
      "desc": "Gain @NumChamps@ Exalted Champions. Your Exalted Soul Core gains @BaseGold@ gold instead of XP. If you lose combat, it gains @BonusGold@ bonus gold.<br><br><rules>If there no 1 or 2-cost Exalted champions, get one 3-cost instead.</rules>",
      "effects": {
          "BaseGold": 2,
          "BonusGold": 2,
          "NumChamps": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/VenerablePiggyBank_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Venerable Piggy Bank",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Fated",
      "associatedTraits": [
          "TFT11_Fated"
      ],
      "composition": [],
      "desc": "When one of your Fated pair dies, your team gains @DeathBonus*100@% of the surviving one's bonus for the rest of combat. Gain an Ahri and a Yasuo.",
      "effects": {
          "DeathBonus": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MyHeartWillGoOn_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "My Heart Will Go On",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DuelistCrown",
      "associatedTraits": [
          "TFT11_Duelist"
      ],
      "composition": [],
      "desc": "Gain a Duelist Emblem, a Giant Slayer, and a Qiyana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Duelist_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Duelist Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Sage",
      "associatedTraits": [
          "TFT11_Sage"
      ],
      "composition": [],
      "desc": "Gain @BaseXP@ XP at the start of each combat. Each unique Sage that starts in the middle two rows grants @XP@ more. Gain a Zyra.",
      "effects": {
          "BaseXP": 1,
          "XP": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TheRoadLessTraveled_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Road Less Traveled",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Reaper",
      "associatedTraits": [
          "TFT11_Reaper"
      ],
      "composition": [],
      "desc": "Your Reapers gain @crit*100@% Critical Strike Chance and @omnivamp*100@% Omnivamp. They gain this bonus again every time they get a takedown. Gain a Kindred and Yone.",
      "effects": {
          "Crit": 0.07999999821186066,
          "Omnivamp": 0.05000000074505806
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GrimHarvest_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Grim Harvest",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_UmbralCrown",
      "associatedTraits": [
          "TFT11_Umbral"
      ],
      "composition": [],
      "desc": "Gain an Umbral Emblem, a Redemption, and a Yorick.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Umbral_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Umbral Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Dryad",
      "associatedTraits": [
          "TFT11_Dryad"
      ],
      "composition": [],
      "desc": "Every round, gain @RoundStacks@ Dryad stacks. Dryads deal @bonusdamage*100@% additional damage. Gain a Rek'Sai and&nbsp;a&nbsp;Gnar.",
      "effects": {
          "BonusDamage": 0.07999999821186066,
          "RoundStacks": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Mulched_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mulched",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_HeavenlyCrown",
      "associatedTraits": [
          "TFT11_Heavenly"
      ],
      "composition": [],
      "desc": "Gain a Heavenly Emblem, a Hand of Justice, and a Neeko.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Heavenly_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Heavenly Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_GhostlyCrown",
      "associatedTraits": [
          "TFT11_Ghostly"
      ],
      "composition": [],
      "desc": "Gain a Ghostly Emblem, a Gargoyle Stoneplate, and an Illaoi.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Ghostly_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ghostly Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ReaperCrown",
      "associatedTraits": [
          "TFT11_Reaper"
      ],
      "composition": [],
      "desc": "Gain a Reaper Emblem, a Hand of Justice, and a Kindred.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Reaper_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reaper Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SniperCrown",
      "associatedTraits": [
          "TFT11_Sniper"
      ],
      "composition": [],
      "desc": "Gain a Sniper Emblem, a Guinsoo's Rageblade, and an Aphelios.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Sniper_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sniper Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Mythic",
      "associatedTraits": [
          "TFT11_Mythic"
      ],
      "composition": [],
      "desc": "Every time a unique Mythic champion becomes Epic, gain @Health@ player health and @Gold@ gold. Gain a Cho'Gath and Kog'Maw.",
      "effects": {
          "Gold": 3,
          "Health": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoingToBeEpic_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "It's Going to be Epic",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_AltruistCrown",
      "associatedTraits": [
          "TFT11_Altruist"
      ],
      "composition": [],
      "desc": "Gain an Altruist Emblem, a Bloodthirster, and a Riven.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown_Altruist_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Altruist Crown",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_WithItemAS2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @AttackSpeed*100@ Attack Speed.",
      "effects": {
          "AttackSpeed": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tutorial-Elite-Vanguard-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Elite Vanguard",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Augment_AbilityPwr",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "AbilityPower": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_Mana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "Mana": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_Armor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "Armor": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_FrontRowHealth1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your champions in the front 2 rows gain @Health@ Health.",
      "effects": {
          "Health": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tutorial-Bulwark-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bulwark",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Augment_BackRowAS1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your champions in the back 2 rows gain @AS*100@ Attack Speed.",
      "effects": {
          "AS": 0.20000000298023224,
          "HexRangeIncrease": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tutorial-Swift-Strike-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Swift Strike",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Augment_WithoutItemAS2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions without items gain @AttackSpeed*100@ Attack Speed.",
      "effects": {
          "AttackSpeed": 0.550000011920929
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Unladen-Airspeed-Velocity-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unhindered",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Augment_AtkDmg",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "AttackDamage": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_AtkSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "AttackSpeed": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Augment_WithItemHealth2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health.",
      "effects": {
          "Health": 300
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Bulk-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Mass",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_MR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "MR": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_Health",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "Health": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Augment_FrontRowMana1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your champions in the front 2 rows gain @Mana@ Mana.",
      "effects": {
          "Mana": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tutorial-Splash-Zone-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Splash Zone",
      "unique": true
  },
  {
      "apiName": "TFT11_ChampionItem_Sylas",
      "associatedTraits": [],
      "composition": [],
      "desc": "Sylas",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Sylas_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sylas",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_KhaZix",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kha'Zix",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_KhaZix_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kha'Zix",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Janna",
      "associatedTraits": [],
      "composition": [],
      "desc": "Janna",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Janna_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Janna",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Alune",
      "associatedTraits": [],
      "composition": [],
      "desc": "Alune",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Alune_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Alune",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Zoe",
      "associatedTraits": [],
      "composition": [],
      "desc": "Zoe",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Zoe_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zoe",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Senna",
      "associatedTraits": [],
      "composition": [],
      "desc": "Senna",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Senna_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Senna",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Yone",
      "associatedTraits": [],
      "composition": [],
      "desc": "Yone",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Yone_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Yone",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_LeeSin",
      "associatedTraits": [],
      "composition": [],
      "desc": "Lee Sin",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_LeeSin_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lee Sin",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Darius",
      "associatedTraits": [],
      "composition": [],
      "desc": "Darius",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Darius_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Darius",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Kindred",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kindred",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Kindred_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kindred",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Thresh",
      "associatedTraits": [],
      "composition": [],
      "desc": "Thresh",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Thresh_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thresh",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Galio",
      "associatedTraits": [],
      "composition": [],
      "desc": "Galio",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Galio_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Galio",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_TahmKench",
      "associatedTraits": [],
      "composition": [],
      "desc": "Tahm Kench",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_TahmKench_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tahm Kench",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Hwei",
      "associatedTraits": [],
      "composition": [],
      "desc": "Hwei",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Hwei_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hwei",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Kaisa",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kai'Sa",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Kaisa_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kai'Sa",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Neeko",
      "associatedTraits": [],
      "composition": [],
      "desc": "Neeko",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Neeko_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Neeko",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Syndra",
      "associatedTraits": [],
      "composition": [],
      "desc": "Syndra",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Syndra_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Syndra",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_ChoGath",
      "associatedTraits": [],
      "composition": [],
      "desc": "Cho'Gath",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_ChoGath_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cho'Gath",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Amumu",
      "associatedTraits": [],
      "composition": [],
      "desc": "Amumu",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Amumu_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Amumu",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Qiyana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Qiyana",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Qiyana_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Qiyana",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Yasuo",
      "associatedTraits": [],
      "composition": [],
      "desc": "Yasuo",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Yasuo_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Yasuo",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Sivir",
      "associatedTraits": [],
      "composition": [],
      "desc": "Sivir",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Sivir_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sivir",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Morgana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Morgana",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Morgana_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Morgana",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Shyvana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Shyvana",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Shyvana_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shyvana",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_MasterYi",
      "associatedTraits": [],
      "composition": [],
      "desc": "Master Yi",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT11_MasterYi/Skins/Base/Images/TFT11_MasterYi_splash_tile_89.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Master Yi",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Kayn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kayn",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Kayn_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kayn",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_RekSai",
      "associatedTraits": [],
      "composition": [],
      "desc": "Rek'Sai",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_RekSai_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rek'Sai",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_FortuneYord",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kobuko",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_FortuneYord_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kobuko",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_XayahRakan",
      "associatedTraits": [],
      "composition": [],
      "desc": "Rakan",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Shen_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rakan",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Volibear",
      "associatedTraits": [],
      "composition": [],
      "desc": "Volibear",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Volibear_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Volibear",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Tryndamere",
      "associatedTraits": [],
      "composition": [],
      "desc": "Tryndamere",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Tryndamere_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tryndamere",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Aatrox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aatrox",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Aatrox_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Aatrox",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Teemo",
      "associatedTraits": [],
      "composition": [],
      "desc": "Teemo",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Teemo_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Teemo",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Yorick",
      "associatedTraits": [],
      "composition": [],
      "desc": "Yorick",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Yorick_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Yorick",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Shen",
      "associatedTraits": [],
      "composition": [],
      "desc": "Shen",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Shen_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shen",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Tristana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Tristana",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Tristana_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tristana",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Udyr",
      "associatedTraits": [],
      "composition": [],
      "desc": "Udyr",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Udyr_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Udyr",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Malphite",
      "associatedTraits": [],
      "composition": [],
      "desc": "Malphite",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Malphite_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Malphite",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Lissandra",
      "associatedTraits": [],
      "composition": [],
      "desc": "Lissandra",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Lissandra_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lissandra",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Aphelios",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aphelios",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Aphelios_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Aphelios",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Ahri",
      "associatedTraits": [],
      "composition": [],
      "desc": "Ahri",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Ahri_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ahri",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Lux",
      "associatedTraits": [],
      "composition": [],
      "desc": "Lux",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Lux_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lux",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Ashe",
      "associatedTraits": [],
      "composition": [],
      "desc": "Ashe",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Ashe_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ashe",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Riven",
      "associatedTraits": [],
      "composition": [],
      "desc": "Riven",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Riven_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Riven",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_KogMaw",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kog'Maw",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_KogMaw_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kog'Maw",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Bard",
      "associatedTraits": [],
      "composition": [],
      "desc": "Bard",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Bard_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bard",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Zyra",
      "associatedTraits": [],
      "composition": [],
      "desc": "Zyra",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Zyra_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zyra",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Karthus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Karthus",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT11_Karthus/Skins/Base/Images/TFT11_Karthus_splash_centered_26.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Karthus",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Ornn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Ornn",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Ornn_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ornn",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Sett",
      "associatedTraits": [],
      "composition": [],
      "desc": "Sett",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Sett_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sett",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Wukong",
      "associatedTraits": [],
      "composition": [],
      "desc": "Wukong",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_WuKong_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wukong",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Lillia",
      "associatedTraits": [],
      "composition": [],
      "desc": "Lillia",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Lillia_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lillia",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Annie",
      "associatedTraits": [],
      "composition": [],
      "desc": "Annie",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Annie_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Annie",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Irelia",
      "associatedTraits": [],
      "composition": [],
      "desc": "Irelia",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Irelia_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Irelia",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Caitlyn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Caitlyn",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Caitlyn_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caitlyn",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Gnar",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gnar",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_GnarSmall_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gnar",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Garen",
      "associatedTraits": [],
      "composition": [],
      "desc": "Garen",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Garen_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Garen",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Illaoi",
      "associatedTraits": [],
      "composition": [],
      "desc": "Illaoi",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Illaoi_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Illaoi",
      "unique": false
  },
  {
      "apiName": "TFT11_ChampionItem_Soraka",
      "associatedTraits": [],
      "composition": [],
      "desc": "Soraka",
      "effects": {},
      "from": null,
      "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Soraka_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Soraka",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveRageblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks grant @AttackSpeedPerStack@% stacking Attack Speed.",
      "effects": {
          "AP": 10,
          "AS": 10,
          "AttackSpeedPerStack": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Guinsoos_Rageblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guinsoo's Rageblade",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_StarUp2Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Upgrade the next 2-cost you purchase.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Kit2Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2-Costs",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Kit3Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "3-Cost",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_HighEndShopping_Limited",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "For 3 rounds your Shops are 1 level higher.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_BoarStance",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Boar - Defense",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Blue",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Gain8Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "8 gold",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_3Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 3 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_UnitBuffs3Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AS": 0.15000000596046448,
          "Cost": 3,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All of your @Cost@-cost champions gain @Health@ Health and @AS*100@% Attack Speed.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GainComponentsLoseShopSlot",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "{7f8afef1}": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lose a Shop slot forever; gain 3 component anvils.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Gain7Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 7 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Red",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Red",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_BearStance",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bear - Attack",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_TradeGoldForComponent",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trade @TFTUnitProperty.item:TFT11_Encounter_ChoiceItem_GoldForComponent_GoldAmount@ gold for a random component. You currently have @TFTUnitProperty.item:TFT11_Encounter_ChoiceItem_GoldForComponent_CurrentGold@ gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_5WinStreak",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Set your current win streak to 6.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitInvokers",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invokers",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_5LossStreak",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Set your current loss streak to 6.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveZekes",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant %i:scaleAS% @AttackSpeed@% Attack Speed to the holder and allies within 2 hexes in the same row.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "AttackSpeed": 30,
          "Health": 150,
          "HexRange": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Zekes_Herald.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zeke's Herald",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveHoJ",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 2 effects:<li>@BaseAD*100@% Attack Damage and @BaseSP@ Ability Power.<li>@Omnivamp*100@% Omnivamp<br><br>Each round, randomly double 1 of these effects.",
      "effects": {
          "BaseAD": 0.15000000596046448,
          "BaseHeal": 15,
          "BaseSP": 15,
          "BonusSP": 15,
          "CritChance": 20,
          "Mana": 15,
          "Omnivamp": 0.15000000596046448,
          "{693a77ae}": 0.15000000596046448,
          "{a60806db}": 66.66699981689453
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Hand_of_Justice.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hand Of Justice",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_1NormalDupe",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "{4a99a5b2}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "1 Champion Duplicator",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_3Rerolls",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 3 rerolls.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_ArtifactArmory",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Open an Artifact Armory.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveGiantSlayer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @DamageAmp*100@% Damage Amp against enemies with more than @HealthThreshold@ max Health.",
      "effects": {
          "AD": 0.25,
          "AP": 25,
          "AS": 10,
          "DamageAmp": 0.25,
          "HealthThreshold": 1750,
          "LargeBonusPct": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Giant_Slayer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant Slayer",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_DoNothing",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Do nothing.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_10Rerolls",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "10 free rerolls",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitWarden",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wardens",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_PredictWin",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "GoldReward": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "I'll win!<br>Reward: 10 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_HPTeamBuff",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AD": "null",
          "AP": "null",
          "HP": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Your team gains 150 Health.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_14XP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "XP": 14
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 14 Experience.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_DoubleInterest_Limited",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "For 3 rounds, double your interest.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_ADTeamBuff",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AD": 0.15000000596046448,
          "AP": "null",
          "HP": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Your team gains 15% Attack Damage.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Recombobulate",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Recombobulate your board. Gain 2 Magnetic Removers.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_2x2cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 2 random 2 cost champions.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_SupportArmory",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Open a Support Armory.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GoldOnKill",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "50% chance for 1 gold on kill",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_UnitBuffs2Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AS": 0.18000000715255737,
          "Cost": 2,
          "Health": 180
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All of your @Cost@-cost champions gain @Health@ Health and @AS*100@% Attack Speed.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_ChampionDuplicator",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "{cd5eb5cd}": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain a Champion Duplicator.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_UnitBuffs4Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AS": 0.11999999731779099,
          "Cost": 4,
          "Health": 120
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All of your @Cost@-cost champions gain @Health@ Health and @AS*100@% Attack Speed.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_FON",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fight a challenging PVE round with powerful rewards.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GoldOnDeath",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "50% chance for 1 gold on ally death",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveLocket",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: The holder and allies within @HexRange@ hexes in the same row gain a @ShieldValue@ Shield, @BonusResists@ Armor, and @BonusResists@ Magic Resist for @ShieldDuration@ seconds.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BonusResists": 20,
          "Health": 150,
          "HexRange": 2,
          "ShieldDuration": 20,
          "ShieldValue": 250
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Locket_of_the_Iron_Solari.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Locket of the Iron Solari",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_BuyExpensiveArtifact",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spend 22 gold. Gain an Artifact anvil.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitBrawler",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bruisers",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_5Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 5 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveRedemption",
      "associatedTraits": [],
      "composition": [],
      "desc": "Heal allies within 1 hex for @MissingHealthHeal@% of their missing Health every @HealTickRate@ seconds. They also gain @AoEDamageReduction@% Durability for @HealTickRate@ seconds (this does not stack).<br><br><TFTTrackerLabel>Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AoEDamageReduction": 10,
          "HealTickRate": 5,
          "Health": 150,
          "HexRadius": 1,
          "Mana": 15,
          "MaxHeal": 1000,
          "MissingHealthHeal": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Redemption.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Redemption",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_2LesserDupe",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "LesserDuplicatorAmount": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 Lesser Champion Duplicators",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_3cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "3-cost champion",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_15Health",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "{cd5eb5cd}": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 10 Health.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_RedemptionItem",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Redemption.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Redemption",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveSunfire",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @ICD@ seconds, deal @BurnPercent@% <TFTKeyword>Burn</TFTKeyword> and @GrievousWoundsPercent@% <TFTKeyword>Wound</TFTKeyword> to an enemy within @HexRange@ hexes for @BurnDuration@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "Armor": 20,
          "BurnDuration": 10,
          "BurnPercent": 1,
          "GrievousWoundsPercent": 33,
          "Health": 250,
          "HexRange": 2,
          "ICD": 2,
          "MonsterCap": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Sunfire_Cape.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sunfire Cape",
      "unique": true
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveGunblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Heal the lowest percent Health ally for @AllyHealing*100@% of damage dealt.<br><br><TFTTrackerLabel>Ally Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "AllyHealing": 0.20000000298023224,
          "Omnivamp": 20,
          "StatOmnivamp": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Hextech_Gunblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hextech Gunblade",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitSniper",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Snipers",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_APTeamBuff",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "AD": "null",
          "AP": 18,
          "HP": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Your team gains 18 Ability Power.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GoldenRemover",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain a Magnetic Remover with infinite uses.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveWarmogs",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @BonusPercentHP*100@% max health.",
      "effects": {
          "BonusPercentHP": 0.11999999731779099,
          "Health": 600
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Warmogs_Armor.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warmog's Armor",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_20XP",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "20 XP",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_PredictLose",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "GoldReward": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "I'll lose!<br>Reward: 7 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_InsufficientGold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "You lack the gold to offer this spirit.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_BuyExpensiveComponent",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spend 12 gold for a component anvil.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiveSteadfast",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @BaseDurability*100@% Durability. While above @ThresholdForEmpower*100@% Health, instead gain @EmpoweredDurability*100@% Durability.",
      "effects": {
          "Armor": 20,
          "BaseDamageReduction": 8,
          "BaseDurability": 0.07999999821186066,
          "CritChance": 20,
          "EmpowerDamageReduction": 15,
          "EmpoweredDurability": 0.15000000596046448,
          "Health": 200,
          "ThresholdForEmpower": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Behemoth.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Steadfast Heart",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_Gain10Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain 10 gold.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitDuelist",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Duelists",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitBehemoth",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Behemoths",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_2star1cost",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 star 1-cost champion",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_ComponentAnvil",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gain a component anvil.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_TOT",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "You gain +1 team size.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitReaper",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reapers",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitArcanist",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcanists",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_GiantSlayerItem",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Giant_Slayer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant Slayer",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_DeclineTheOffer",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Decline the offer.",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_PhoenixStance",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phoenix  - Magic",
      "unique": false
  },
  {
      "apiName": "TFT11_Encounter_ChoiceItem_KitTrickshot",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trickshots",
      "unique": false
  },
  {
      "apiName": "TFT_Item_InfinityEdge",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Abilities can critically strike.<br><br>If the holder's abilities can already critically strike, gain @CritDamageToGive*100@% Critical Strike Damage instead.",
      "effects": {
          "AD": 0.3499999940395355,
          "CritChance": 35,
          "CritDamageToGive": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Infinity_Edge.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Infinity Edge",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_DragonsClawRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> max health.<br><br>Every @HealthRegenInterval@ seconds, heal <TFTRadiantItemBonus>@PercentHealthDamage@%</TFTRadiantItemBonus> max Health.<br>",
      "effects": {
          "HealthRegenInterval": 2,
          "ICD": 0.5,
          "MagicResist": 115,
          "MaxHealthRegen": 2,
          "PercentHealthDamage": 10,
          "PercentMaxHP": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Dragons_Claw_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dragon's Will",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_TrapClawRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "After damaging a Shield, gain <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> Damage Amp for @Duration@ seconds.",
      "effects": {
          "AP": 30,
          "AS": 30,
          "CritChance": 20,
          "DamageAmp": 0.4000000059604645,
          "DamageAmpPct": 40,
          "Duration": 3,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Stridebreaker-Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Willbreaker",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_IonicSparkRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "@MRShred@% <TFTKeyword>Shred</TFTKeyword> enemies within <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexes. When enemies cast an Ability, deal magic damage equal to <TFTRadiantItemBonus>@ManaRatio@%</TFTRadiantItemBonus> of the Mana spent..<br><br><TFTRadiantItemBonus>Also, heal @MaxHealthRegen@% max Health per second.</TFTRadiantItemBonus><br><br><tftitemrules>[Direct damage item]<br><tftbold>Shred</tftbold>: Reduce Magic Resist</tftitemrules>",
      "effects": {
          "AP": 15,
          "Health": 200,
          "HealthRegenInterval": 1,
          "HexRange": 3,
          "MRShred": 30,
          "MagicResist": 40,
          "ManaRatio": 200,
          "MaxHealthRegen": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Ionic_Spark_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Covalent Spark",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_QuicksilverRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Gain immunity to crowd control for <TFTRadiantItemBonus>@SpellShieldDuration@</TFTRadiantItemBonus> seconds. <TFTRadiantItemBonus>For @ASTotalDuration@ seconds, gain @ProcAttackSpeed*100@% Attack Speed every @ProcInterval@ seconds.</TFTRadiantItemBonus><br><br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AS": 50,
          "ASTotalDuration": 14,
          "CritChance": 40,
          "MagicResist": 30,
          "ProcAttackSpeed": 0.09000000357627869,
          "ProcInterval": 2,
          "SpellShieldDuration": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Quicksilver_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Quickestsilver",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_HextechGunbladeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Heal the lowest percent Health ally for <TFTRadiantItemBonus>@AllyHealing*100@%</TFTRadiantItemBonus> of damage dealt.<br><br><TFTTrackerLabel>Ally Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AllyHealing": 0.3499999940395355,
          "Omnivamp": 35,
          "StatOmnivamp": 0.3499999940395355
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Hextech_Gunblade_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hextech Lifeblade",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_StatikkShivRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every 3rd attack deals <TFTRadiantItemBonus>@Damage@</TFTRadiantItemBonus> magic damage and  @MRShred@% <TFTKeyword>Shreds</TFTKeyword> <TFTRadiantItemBonus>@1StarBounces@</TFTRadiantItemBonus> enemies for @MRShredDuration@ seconds.<br><br><tftitemrules><tftbold>Shred</tftbold>: Reduce Magic Resist</tftitemrules>",
      "effects": {
          "1StarBounces": 8,
          "AP": 50,
          "AS": 20,
          "Damage": 95,
          "MRShred": 30,
          "MRShredDuration": 5,
          "Mana": 15,
          "{12a15e9e}": 8,
          "{15144cec}": 8,
          "{79e2ec7b}": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Statikk_Shiv_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Statikk's Favor",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_FrozenHeartRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat at @HealthThreshold@% Health, gain a <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> max Health Shield that lasts <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seconds and gain <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> Armor and <TFTRadiantItemBonus>@Stats@</TFTRadiantItemBonus> Magic Resist.<br>",
      "effects": {
          "Armor": 40,
          "HealthThreshold": 40,
          "Mana": 30,
          "ShieldDuration": 10,
          "ShieldHealthPercent": 50,
          "Stats": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Fimbulwinter_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bulwark's Oath",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_BlueBuffRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Max mana reduced by @ManaReduction@. <br><br>When the holder gets a takedown, they deal <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> more damage for <TFTRadiantItemBonus>@TakedownTimer@</TFTRadiantItemBonus> seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br><br>",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "DamageAmp": 0.20000000298023224,
          "Mana": 20,
          "ManaReduction": 10,
          "TakedownTimer": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Blue_Buff_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Blessing",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_ArchangelsStaffRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Gain <TFTRadiantItemBonus>@APPerInterval@</TFTRadiantItemBonus> Ability Power every <TFTRadiantItemBonus>@IntervalSeconds@</TFTRadiantItemBonus> seconds in combat.",
      "effects": {
          "AP": 50,
          "APPerInterval": 40,
          "IntervalSeconds": 4,
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Archangel_Staff_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Urf-Angel's Staff",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_MorellonomiconRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks and Abilities deal <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> <TFTKeyword>Burn</TFTKeyword> and @GrievousWoundsPercent@% <TFTKeyword>Wound</TFTKeyword> to enemies for <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seconds.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "AP": 50,
          "AS": 25,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 150,
          "MonsterCap": 150,
          "TicksPerSecond": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Morellonomicon_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "More More-ellonomicon",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_BrambleVestRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@PercentMaxHP*100@%</TFTRadiantItemBonus> max health.<br><br>Take <TFTRadiantItemBonus>@AutoDamageReduction*100@%</TFTRadiantItemBonus> reduced damage from attacks. When struck by any attack, deal <TFTRadiantItemBonus>@1StarAoEDamage@</TFTRadiantItemBonus> magic damage to all adjacent enemies.<br><br><tftitemrules>Cooldown: @ICD@ seconds</tftitemrules>",
      "effects": {
          "1StarAoEDamage": 175,
          "2StarAoEDamage": 175,
          "3StarAoEDamage": 175,
          "Armor": 100,
          "AutoDamageReduction": 0.25,
          "ICD": 2,
          "PercentMaxHP": 0.07999999821186066,
          "{b5c2a66b}": 175
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Bramble_Vest_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rosethorn Vest",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_ZzRotPortalRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Summon a large Voidspawn. Its strength increases with each Stage.<br><br>​​<tftitemrules>[Support item]<br>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "Health": 150,
          "SummonedStatReduction": 25,
          "{50a0dbb5}": 1,
          "{ef0bb7c2}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/ZZRot_Portal.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zz'Rot Portal",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_ShroudOfStillnessRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Shoot a <TFTRadiantItemBonus>wider beam</TFTRadiantItemBonus> that <TFTRadiantItemBonus>@CostIncrease@%</TFTRadiantItemBonus> <TFTKeyword>Mana Reaves</TFTKeyword> enemies.<br><TFTRadiantItemBonus>Your team gains %i:scaleMana% @AllyBonusMana@ starting Mana.</TFTRadiantItemBonus><br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Mana Reave</tftbold>: increase maximum Mana until the next cast</tftitemrules><br>",
      "effects": {
          "AllyBonusMana": 25,
          "Armor": 20,
          "CostIncrease": 50,
          "CritChance": 20,
          "Health": 400,
          "{4516a18d}": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Shroud_of_Stillness_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shroud of Reverence",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_RunaansHurricaneRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks fire a bolt at a nearby enemy, dealing <TFTRadiantItemBonus>@MultiplierForDamage@%</TFTRadiantItemBonus> Attack Damage %i:scaleAD% as physical damage.<br>",
      "effects": {
          "AD": 0.3499999940395355,
          "AS": 20,
          "AdditionalTargets": 1,
          "MagicResist": 20,
          "MultiplierForDamage": 110
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Runaans_Hurricane_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Runaan's Tempest",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_ZephyrRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Summon a whirlwind on the opposite side of the arena that removes the closest enemy from combat for <TFTRadiantItemBonus>@BanishDuration@</TFTRadiantItemBonus> seconds.<br><TFTRadiantItemBonus>Your team gains %i:scaleAS% @AllyBonusAS@% Attack Speed.</TFTRadiantItemBonus><br><br><tftitemrules>[Ignores crowd control immunity.]<br>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AS": 20,
          "AllyBonusAS": 15,
          "BanishDuration": 8,
          "Health": 300,
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Zephyr_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mistral",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_GuinsoosRagebladeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks grant <TFTRadiantItemBonus>@AttackSpeedPerStack@%</TFTRadiantItemBonus> stacking Attack Speed.",
      "effects": {
          "AP": 10,
          "AS": 20,
          "AttackSpeedPerStack": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Guinsoos_Rageblade_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guinsoo's Reckoning",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_HandOfJusticeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 2 effects:<li><TFTRadiantItemBonus>@ADBuff*100@%</TFTRadiantItemBonus> Attack Damage and <TFTRadiantItemBonus>@APBuff@</TFTRadiantItemBonus> Ability Power.<li><TFTRadiantItemBonus>@Omnivamp*100@%</TFTRadiantItemBonus> Omnivamp",
      "effects": {
          "ADBuff": 0.5,
          "APBuff": 50,
          "CritChance": 40,
          "Mana": 15,
          "Omnivamp": 0.30000001192092896,
          "TraitMultiplier": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Hand_of_Justice_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fist of Fairness",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_SunfireCapeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every <TFTRadiantItemBonus>@ICD@</TFTRadiantItemBonus> seconds, deal <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> <TFTKeyword>Burn</TFTKeyword> and @GrievousWoundsPercent@% <TFTKeyword>Wound</TFTKeyword> to an enemy within <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexes for <TFTRadiantItemBonus>@BurnDuration@</TFTRadiantItemBonus> seconds.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: reduces healing received</tftitemrules>",
      "effects": {
          "Armor": 20,
          "BurnDuration": 30,
          "BurnPercent": 2,
          "GrievousWoundsPercent": 33,
          "Health": 300,
          "HealthRegenInterval": "null",
          "HexRange": 3,
          "ICD": 1.5,
          "MaxHealthRegen": "null",
          "MonsterCap": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Sunfire_Cape_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sunlight Cape",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_ZekesHeraldRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant %i:scaleAS% <TFTRadiantItemBonus>@AttackSpeed@%</TFTRadiantItemBonus> Attack Speed and <TFTRadiantItemBonus>@Lifesteal@%</TFTRadiantItemBonus> <TFTKeyword>Omnivamp</TFTKeyword> to the holder and allies within 1 hex in the same row.<br><br>​​<tftitemrules><tftbold>Omnivamp</tftbold>: heal for some of damage dealt</tftitemrules>",
      "effects": {
          "AD": 0.3499999940395355,
          "AttackSpeed": 35,
          "Health": 350,
          "HexRange": 1,
          "LifeSteal": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Zekes_Herald_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zeke's Harmony",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_LastWhisperRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Physical damage @ArmorReductionPercent@% <TFTKeyword>Sunders</TFTKeyword> the target for <TFTRadiantItemBonus>the rest of combat.</TFTRadiantItemBonus> This effect does not stack.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Sunder</tftbold>: Reduce Armor</tftitemrules>",
      "effects": {
          "AD": 0.44999998807907104,
          "AS": 25,
          "ArmorBreakDuration": 50,
          "ArmorReductionPercent": 30,
          "CritChance": 55
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Last_Whisper_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eternal Whisper",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_LocketOfTheIronSolariRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Shields the holder and allies within <TFTRadiantItemBonus>@HexRange@</TFTRadiantItemBonus> hexes in the same row for <TFTRadiantItemBonus>@1StarShieldValue@/@2StarShieldValue@/@3StarShieldValue@</TFTRadiantItemBonus> %i:star% damage for <TFTRadiantItemBonus>@ShieldDuration@</TFTRadiantItemBonus> seconds.<br><TFTRadiantItemBonus>Your team gains %i:scaleHealth% @BonusAllyHealth@ Health.</TFTRadiantItemBonus>",
      "effects": {
          "1StarShieldValue": 275,
          "2StarShieldValue": 325,
          "3StarShieldValue": 375,
          "AP": 10,
          "Armor": 20,
          "BonusAllyHealth": 200,
          "HexRange": 3,
          "ShieldDuration": 60,
          "{c78af25f}": 425
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Locket_of_the_Iron_Solari_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Locket of Targon Prime",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_ThiefsGlovesRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round: Equip 2 random <TFTRadiantItemBonus>Radiant</TFTRadiantItemBonus> items.<br><br><tftitemrules>[Consumes 3 item slots.]</tftitemrules>",
      "effects": {
          "CritChance": 20,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Thieves_Gloves_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rascal's Gloves",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_WarmogsArmorRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@BonusPercentHP*100@%</TFTRadiantItemBonus> max health.<br><br><TFTRadiantItemBonus>Heal @MaxHealthRegen@% max Health per second.</TFTRadiantItemBonus>",
      "effects": {
          "BonusPercentHP": 0.20000000298023224,
          "Health": 1000,
          "HealthRegenInterval": 1,
          "MaxHealthRegen": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Warmogs_Armor_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warmog's Pride",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_SteraksGageRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat at @HealthThreshold@% Health, gain <TFTRadiantItemBonus>@BonusMaxHealthPerc@% max Health</TFTRadiantItemBonus> and <TFTRadiantItemBonus>@BonusADToGive@% Attack Damage</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.30000001192092896,
          "BonusADToGive": 60,
          "BonusMaxHealthPerc": 40,
          "Health": 400,
          "HealthThreshold": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Steraks_Gage_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sterak's Megashield",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_RedemptionRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Heal allies within <TFTRadiantItemBonus>@HexRadius@</TFTRadiantItemBonus> hexes for <TFTRadiantItemBonus>@MissingHealthHeal@%</TFTRadiantItemBonus> of their missing Health every @HealTickRate@ seconds. They also gain @AoEDamageReduction@% Durability for @HealTickRate@ seconds (this does not stack).<br><br><TFTTrackerLabel>Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AoEDamageReduction": 10,
          "HealTickRate": 5,
          "Health": 400,
          "HexRadius": 2,
          "Mana": 15,
          "MaxHeal": 2000,
          "MissingHealthHeal": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Redemption_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Absolution",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_GuardianAngelRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat: At @HealthThreshold@% Health, briefly become untargetable and shed negative effects. Then, <TFTRadiantItemBonus>heal @MissingHealthRestore*100@% missing health and gain @AttackSpeed@% bonus Attack Speed</TFTRadiantItemBonus>. <br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.30000001192092896,
          "Armor": 30,
          "AttackSpeed": 85,
          "DamageReduction": 100,
          "HealthThreshold": 60,
          "HealthThreshold2": 30,
          "MissingHealthRestore": 1,
          "StealthDuration": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Edge_Of_Night_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Brink of Dawn",
      "unique": true
  },
  {
      "apiName": "TFT5_Item_RapidFirecannonRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks and Abilities <TFTRadiantItemBonus>@BurnPercent@%</TFTRadiantItemBonus> <TFTKeyword>Burn</TFTKeyword> and <TFTRadiantItemBonus>@HealingReductionPct@%</TFTRadiantItemBonus> <TFTKeyword>Wound</TFTKeyword> enemies for @Duration@ seconds.<br><br><tftitemrules><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules><br>",
      "effects": {
          "AS": 60,
          "BonusDamage": 0.10000000149011612,
          "BurnPercent": 2,
          "Duration": 5,
          "HealingReductionPct": 33,
          "HexRangeIncrease": 2,
          "{1543aa48}": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/RedBuff_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crest of Cinders",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_NightHarvesterRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@BaseDurability*100@%</TFTRadiantItemBonus> durability. While above <TFTRadiantItemBonus>@ThresholdForEmpower*100@%</TFTRadiantItemBonus> Health, instead gain <TFTRadiantItemBonus>@EmpoweredDurability*100@%</TFTRadiantItemBonus> Durability.",
      "effects": {
          "Armor": 40,
          "BaseDamageReduction": 16,
          "BaseDurability": 0.1599999964237213,
          "CritChance": 20,
          "EmpowerDamageReduction": 30,
          "EmpoweredDurability": 0.30000001192092896,
          "Health": 500,
          "ThresholdForEmpower": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Behemoth_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Legacy of the Colossus",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_TitansResolveRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@StackingAD*100@%</TFTRadiantItemBonus> Attack Damage and <TFTRadiantItemBonus>@StackingSP@</TFTRadiantItemBonus> Ability Power when attacking or taking damage, stacking up to @StackCap@ times.<br><br>At full stacks, gain <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> Armor and <TFTRadiantItemBonus>@BonusResistsAtStackCap@</TFTRadiantItemBonus> Magic Resist.",
      "effects": {
          "AS": 30,
          "Armor": 35,
          "BonusResistsAtStackCap": 50,
          "StackCap": 25,
          "StackingAD": 0.029999999329447746,
          "StackingSP": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Titans_Resolve_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Titan's Vow",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_GiantSlayerRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@DamageAmp*100@%</TFTRadiantItemBonus> Damage Amp against enemies with more than @HealthThreshold@ max Health.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "AS": 10,
          "DamageAmp": 0.4000000059604645,
          "HealthThreshold": 1750,
          "LargeBonusPct": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Giant_Slayer_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Demonslayer",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_CrownguardRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Gain a <TFTRadiantItemBonus>@ShieldSize@%</TFTRadiantItemBonus> max Health Shield for @ShieldDuration@ seconds. <br>When the shield expires, gain <TFTRadiantItemBonus>@ShieldBonusAP@ Ability Power</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 40,
          "Armor": 40,
          "ChillDuration": 4,
          "Health": 200,
          "HexRange": 5,
          "ShieldBonusAP": 50,
          "ShieldDuration": 8,
          "ShieldSize": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Crownguard_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Royal Crownshield",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_BloodthirsterRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat: At @HealthThreshold@% Health, gain a <TFTRadiantItemBonus>@ShieldHealthPercent@%</TFTRadiantItemBonus> max Health Shield that lasts up to @ShieldDuration@ seconds.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "HealthThreshold": 40,
          "LifeSteal": 40,
          "MagicResist": 20,
          "ShieldDuration": 5,
          "ShieldHealthPercent": 40,
          "StatOmnivamp": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Bloodthirster_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blessed Bloodthirster",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_RabadonsDeathcapRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "",
      "effects": {
          "AP": 70,
          "BonusDamage": 0.5,
          "{1543aa48}": 0.33000001311302185
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Rabadons_Deathcap_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rabadon's Ascended Deathcap",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_JeweledGauntletRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Abilities can critically strike.<br><br>If the holder's abilities can already critically strike, gain @CritDamageToGive*100@% Critical Strike Damage instead.",
      "effects": {
          "AP": 55,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Jeweled_Gauntlet_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Glamorous Gauntlet",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_GargoyleStoneplateRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@ArmorPerEnemy@</TFTRadiantItemBonus> Armor and <TFTRadiantItemBonus>@MRPerEnemy@</TFTRadiantItemBonus> Magic Resist for each enemy targeting the holder.<br><br><TFTRadiantItemBonus>Also, heal @MaxHealthRegen@% max Health each second.</TFTRadiantItemBonus>",
      "effects": {
          "Armor": 50,
          "ArmorPerEnemy": 15,
          "Health": 250,
          "HealthRegenInterval": 1,
          "MRPerEnemy": 15,
          "MagicResist": 50,
          "MaxHealthRegen": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Gargoyle_Stoneplate_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dvarapala Stoneplate",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_ChaliceOfPowerRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant %i:scaleAP% <TFTRadiantItemBonus>@ChaliceAP@</TFTRadiantItemBonus> Ability Power <TFTRadiantItemBonus>and @Spellvamp@% <TFTKeyword>Omnivamp</TFTKeyword></TFTRadiantItemBonus> to the holder and allies within 1 hex in the same row.<br><br>​​<tftitemrules><tftbold>Omnivamp</tftbold>: heal for some of damage dealt</tftitemrules>",
      "effects": {
          "ChaliceAP": 45,
          "HexRange": 1,
          "MagicResist": 45,
          "Mana": 45,
          "Spellvamp": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Chalice_of_Power_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chalice of Charity",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_LeviathanRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "After casting an Ability, gain <TFTRadiantItemBonus>@AttackSpeedToGive@% Attack Speed</TFTRadiantItemBonus> for <TFTRadiantItemBonus>@ASDuration@ seconds</TFTRadiantItemBonus>.",
      "effects": {
          "AP": 30,
          "AS": 20,
          "ASDuration": 8,
          "AttackSpeedToGive": 120,
          "Health": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Nashors_Tooth_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Baron's Gift",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_SpearOfShojinRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks grant <TFTRadiantItemBonus>@FlatManaRestore@ bonus Mana</TFTRadiantItemBonus>.",
      "effects": {
          "AD": 0.3499999940395355,
          "AP": 35,
          "FlatManaRestore": 10,
          "Mana": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Spear_of_Shojin_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spear of Hirana",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_SpectralGauntletRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "@ARReductionAmount@% <TFTKeyword>Sunder</TFTKeyword> enemies within @HexRange@ hexes. Gain <TFTRadiantItemBonus> @BonusResists@ Armor and Magic Resist</TFTRadiantItemBonus> for the first <TFTRadiantItemBonus>@BonusResistDuration@ seconds</TFTRadiantItemBonus> of combat.<br><br><tftitemrules><tftbold>Sunder</tftbold>: Reduce Armor</tftitemrules>",
      "effects": {
          "ARReductionAmount": 30,
          "BonusResistDuration": 15,
          "BonusResists": 50,
          "Health": 500,
          "HexRange": 3,
          "MagicResist": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Evenshroud_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Equinox",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_InfinityEdgeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Abilities can critically strike.<br><br>If the holder's abilities can already critically strike, gain @CritDamageToGive*100@% Critical Strike Damage instead.",
      "effects": {
          "AD": 0.6499999761581421,
          "CritChance": 75,
          "CritDamageToGive": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Infinity_Edge_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zenith Edge",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_DeathbladeRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "@AD%@ Attack Damage",
      "effects": {
          "AD": 1.0499999523162842,
          "BonusDamage": 0.11999999731779099,
          "{1543aa48}": 0.11999999731779099
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Death_Blade_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Luminous Deathblade",
      "unique": false
  },
  {
      "apiName": "TFT5_Item_AdaptiveHelmRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Gain different bonuses based on starting position.<br><br>Front Two Rows: <TFTRadiantItemBonus>@FrontRowBonusResists@</TFTRadiantItemBonus> Armor and Magic Resist. Gain <TFTRadiantItemBonus>@FrontLineManaPerHit@</TFTRadiantItemBonus> Mana when struck by an attack.<br><br>Back Two Rows: <TFTRadiantItemBonus>@BackRowBonusAP@</TFTRadiantItemBonus> Ability Power. Gain <TFTRadiantItemBonus>@ManaPerTickrate@</TFTRadiantItemBonus> Mana every @ManaTickrate@ seconds.<br>",
      "effects": {
          "AP": 25,
          "BackRowBonusAP": 30,
          "FrontLineManaPerHit": 2,
          "FrontRowBonusResists": 60,
          "MagicResist": 30,
          "Mana": 15,
          "ManaPerTickrate": 20,
          "ManaTickrate": 3,
          "TotalAPBonus": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Adaptive_Helm_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jak'sho the Protean",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantCompletedAnvil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Completed Item Key",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyCompleted/HUD/Icons2D/TFT_ArmoryKeyCompleted_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Completed Item Key",
      "unique": false
  },
  {
      "apiName": "TFT_Random_Two_Star_4_Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_PrisonBreak_RandomTwoStar4Cost",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/RuneOfAllegiance_Lesser.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_PrisonBreak",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_100",
      "associatedTraits": [],
      "composition": [],
      "desc": "100 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "100 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_36",
      "associatedTraits": [],
      "composition": [],
      "desc": "36 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "36 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Random_5_Cost",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_PrisonBreak_Random5Cost",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/RuneOfAllegiance.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_PrisonBreak",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_34",
      "associatedTraits": [],
      "composition": [],
      "desc": "34 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "34 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_30",
      "associatedTraits": [],
      "composition": [],
      "desc": "30 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "30 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_18",
      "associatedTraits": [],
      "composition": [],
      "desc": "18 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "18 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_64",
      "associatedTraits": [],
      "composition": [],
      "desc": "64 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "64 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrnnAnvil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Artifact Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyOrnn/HUD/Icons2D/TFT_ArmoryKeyOrnn_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Artifact Anvil",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_76",
      "associatedTraits": [],
      "composition": [],
      "desc": "76 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "76 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_16",
      "associatedTraits": [],
      "composition": [],
      "desc": "16 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "16 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs5",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs4",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs7",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_12",
      "associatedTraits": [],
      "composition": [],
      "desc": "12 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "12 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs6",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs1",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "1 loot orb",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs3",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs2",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs9",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantOrbs8",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "OrbsToGive": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@OrbsToGive@ loot orbs",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantTomeOfTraits",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Tome of Traits",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT8_TeamUpProp/HUD/Icons2D/TFT5_EmblemArmoryKey_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tome of Traits",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent2",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent3",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent1",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "1 component",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent6",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent7",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent4",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent5",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent8",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponent9",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ components",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantComponentAnvil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Component Item Key",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyComponent/HUD/Icons2D/TFT_ArmoryKeyComponent_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Component Item Key",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_154",
      "associatedTraits": [],
      "composition": [],
      "desc": "154 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "154 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_126",
      "associatedTraits": [],
      "composition": [],
      "desc": "126 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "126 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_24",
      "associatedTraits": [],
      "composition": [],
      "desc": "24 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "24 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_25",
      "associatedTraits": [],
      "composition": [],
      "desc": "25 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "25 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_54",
      "associatedTraits": [],
      "composition": [],
      "desc": "54 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "54 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_26",
      "associatedTraits": [],
      "composition": [],
      "desc": "26 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "26 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_20",
      "associatedTraits": [],
      "composition": [],
      "desc": "20 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "20 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_22",
      "associatedTraits": [],
      "composition": [],
      "desc": "22 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "22 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_44",
      "associatedTraits": [],
      "composition": [],
      "desc": "44 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "44 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantCompletedItem3",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ completed items",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantCompletedItem2",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "@ItemsToGive@ completed items",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GrantCompletedItem1",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "ItemsToGive": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "1 completed item",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_40",
      "associatedTraits": [],
      "composition": [],
      "desc": "40 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "40 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_InnervatingLocket",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains @PercentMana@% of their total Mana whenever they're hit by an attack.<br><br>Each cast restores @PercentHealth@% of the holder's max Health over @Duration@ seconds.",
      "effects": {
          "Duration": 3,
          "Health": 150,
          "Mana": 15,
          "PercentHealth": 20,
          "PercentMana": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_InnervatingLocket.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Innervating Locket",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_CursingCat",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_CursingCat_Tooltip",
      "effects": {
          "{0e9f4928}": -200,
          "{23a0d95c}": -0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_CursingCat_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_PumpkinheadPaperweight",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_PumpkinheadPaperwight_Tooltip",
      "effects": {
          "CD": 2,
          "MagicDamage": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_PumpkinheadPaperwight_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_PiercingBlade",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_PiercingBlade_Tooltip",
      "effects": {
          "Crit": 0.15000000596046448,
          "SunderAmount": 0.5,
          "SunderDuration": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_PiercingBlade_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_Test002",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. Gain another @BonusHPPer5MissingHealth@ Health and @OmnivampPercentPer5MissingHealth*100@% Omnivamp per 5 missing player health.<br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "AP": 1000,
          "BonusHPPer5MissingHealth": 2,
          "OmnivampPercentPer5MissingHealth": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Void Heart",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_Test001",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. Gain another @BonusHPPer5MissingHealth@ Health and @OmnivampPercentPer5MissingHealth*100@% Omnivamp per 5 missing player health.<br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "BonusHPPer5MissingHealth": 2,
          "Health": 1000,
          "OmnivampPercentPer5MissingHealth": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vampirism I",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_MysteryEgg",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_MysteryEgg_Tooltip",
      "effects": {
          "BaseCost": 4,
          "{6160782c}": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_MysteryEgg_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_FairyFlower",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_FairyFlower_Tooltip",
      "effects": {
          "MagicDamage": 100,
          "ShredDuration": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_FairyFlower_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_DevilTrident",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_DevilTrident_Tooltip",
      "effects": {
          "MagicDamage": 200,
          "ManaThreshold": 666,
          "WoundDuration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_DevilTrident_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_BastionsBanner",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_BastionsBanner_Tooltip",
      "effects": {
          "HealPercent": 0.6000000238418579,
          "HealthThreshold": 0.5,
          "{d91d8ad2}": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_BastionsBanner_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_DuplicatorPrinter",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_DuplicatorPrinter_Tooltip",
      "effects": {
          "{54b69474}": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_DuplicatorPrinter_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_UnassumingTrophy",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_UnassumingTrophy_Tooltip",
      "effects": {
          "AttackSpeed": 0.4000000059604645,
          "PercentHealth": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_UnassumingTrophy_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_PityPot",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_PityPot_Tooltip",
      "effects": {
          "LossGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_PityPot_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_LuckyDice",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_LuckyDice_Tooltip",
      "effects": {
          "Cooldown": 2,
          "GoldOnWin": 4,
          "{17f1046f}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_LuckyDice_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_ToughCookie",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_ToughCookie_Tooltip",
      "effects": {
          "Health": 300,
          "{23a0d95c}": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/TFT11/TFT11_Item_Storyweaver_APHigh.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_ToughCookie_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_ShopTilYouDrop",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_ShopTilYouDrop_Tooltip",
      "effects": {
          "HealthLoss": 1,
          "Rerolls": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_ShopTilYouDrop_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_OnesOfStats",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_OnesOfStats_Tooltip",
      "effects": {
          "AD": 11,
          "AP": 11,
          "AS": 11,
          "Health": 111,
          "MR": 11,
          "Mana": 11,
          "{5d251efa}": 11
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_OnesOfStats_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_KeepCurrentDoodad",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_KeepCurrentDoodad_Name",
      "effects": {
          "HealPercent": 0.6000000238418579,
          "HealthThreshold": 0.5,
          "{d91d8ad2}": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_KeepCurrentDoodad_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_ShopDowner",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_ShopDowner_Tooltip",
      "effects": {
          "{47078566}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_ShopDowner_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_PiggyBanker",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_PiggyBanker_Tooltip",
      "effects": {
          "BaseGold": 12,
          "{96c61a11}": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_PiggyBanker_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_HyperRoller",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_HyperRoller_Tooltip",
      "effects": {
          "Cooldown": 2,
          "{ac4ddcdc}": 3,
          "{df311dd6}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_HyperRoller_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_DragonkissedWeapons",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_DragonkissedWeapons_Tooltip",
      "effects": {
          "BurnDuration": 3,
          "MagicDamage": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_DragonkissedWeapons_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_AnimatedHat",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_AnimatedHat_Tooltip",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_AnimatedHat_Name",
      "unique": false
  },
  {
      "apiName": "TFT12_Doodad_ElusiveBroomstick",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT12_Doodad_ElusiveBroomstick_Tooltip",
      "effects": {
          "ASDuration": 10,
          "AttackSpeed": 0.4000000059604645,
          "HealthThreshold": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT12_Doodad_ElusiveBroomstick_Name",
      "unique": false
  },
  {
      "apiName": "TFT_Item_FrozenHeart",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_ChainVest"
      ],
      "desc": "Once per combat at @HealthThreshold@% Health, gain a @ShieldHealthPercent@% max Health Shield that lasts @ShieldDuration@ seconds and gain @Stats@ Armor and @Stats@ Magic Resist.",
      "effects": {
          "Armor": 20,
          "HealthThreshold": 40,
          "Mana": 30,
          "ShieldDuration": 5,
          "ShieldHealthPercent": 25,
          "Stats": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Winters_Approach.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Protector's Vow",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugCrit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grants the champion 100% critical strike chance, and their spell can critically strike.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/TFT6_Augment_EnchanterInfinityCane.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Critical Hit!",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_ChampionDuplicator_I",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a 1-cost champion to create a 1-star copy of them.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/ChampionDuplicator_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Champion Duplicator",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_TomeOfTraits",
      "associatedTraits": [],
      "composition": [],
      "desc": "Tome of Traits and Reforger",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT8_TeamUpProp/HUD/Icons2D/TFT5_EmblemArmoryKey_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tome of Traits and Reforger",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RandomComponent",
      "associatedTraits": [],
      "composition": [],
      "desc": "Random Component",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Random Component",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_TacticiansCrown",
      "associatedTraits": [],
      "composition": [],
      "desc": "Tactician's Crown",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Tacticians_Crown.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tactician's Crown",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_ThiefsGloves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Thief's Gloves",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Thieves_Gloves.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thief's Gloves",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Tier2_Units",
      "associatedTraits": [],
      "composition": [],
      "desc": "3 2-cost champions",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_Champ_2c.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "3 2-cost champions",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Spatula",
      "associatedTraits": [],
      "composition": [],
      "desc": "Spatula",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Spatula.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spatula",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_8",
      "associatedTraits": [],
      "composition": [],
      "desc": "8 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "8 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_3",
      "associatedTraits": [],
      "composition": [],
      "desc": "5 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "5 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_2",
      "associatedTraits": [],
      "composition": [],
      "desc": "5 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "5 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_7",
      "associatedTraits": [],
      "composition": [],
      "desc": "7 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "7 Gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_6",
      "associatedTraits": [],
      "composition": [],
      "desc": "6 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "6 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_5",
      "associatedTraits": [],
      "composition": [],
      "desc": "5 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "5 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_4",
      "associatedTraits": [],
      "composition": [],
      "desc": "4 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "4 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Tier5_Units_And_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "5-cost Champion and 7 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_Champ_5c.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "5-cost Champion and 7 Gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Reforger_And_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reforger and 5 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemReroller.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reforger and 5 Gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Spatula_And_ItemArmoryComponent",
      "associatedTraits": [],
      "composition": [],
      "desc": "Spatula and Component Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_AnvilSpatula.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spatula and Component Anvil",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RandomOrnnItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "Artifact Item",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_RandomItem_Ornn.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Artifact Item",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Tier3_Units",
      "associatedTraits": [],
      "composition": [],
      "desc": "2 3-cost champions",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_Champ_3c.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 3-cost champions",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RandomCompletedItems_And_Reforger",
      "associatedTraits": [],
      "composition": [],
      "desc": "2 Completed Items and Reforger",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 Completed Items and Reforger",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_TrainingDummy",
      "associatedTraits": [],
      "composition": [],
      "desc": "1 Training Dummy",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_Dummy.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "1 Training Dummy",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_LoadedDice",
      "associatedTraits": [],
      "composition": [],
      "desc": "Loaded Dice",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ShopReroll.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Loaded Dice",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Remover_And_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Remover and 5 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemRemover.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Remover and 5 Gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_ItemArmoryCompleted",
      "associatedTraits": [],
      "composition": [],
      "desc": "Completed Item Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyCompleted/HUD/Icons2D/TFT_ArmoryKeyCompleted_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Completed Item Anvil",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Gold_10",
      "associatedTraits": [],
      "composition": [],
      "desc": "10 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "10 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RandomComponent_3",
      "associatedTraits": [],
      "composition": [],
      "desc": "2 Components",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistRandomComponent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 Components",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Tier4_Units",
      "associatedTraits": [],
      "composition": [],
      "desc": "2 4-cost champions",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_Champ_4c.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "2 4-cost champions",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RandomRadiantItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "Radiant Item",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_RandomItem_Radiant.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Radiant Item",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_ItemArmoryComponent",
      "associatedTraits": [],
      "composition": [],
      "desc": "Component Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyComponent/HUD/Icons2D/TFT_ArmoryKeyComponent_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Component Anvil",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_LesserRuneOfAllegiance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Place on a Tier 1, 2, or 3 champion to transfer them to your partner. Any items held will pop off.<br><br>Once used, this item regenerates in @RoundsToRegain@ rounds. At 4-1 it upgrades into a Rune of Allegiance.<br><br><tftitemrules>[Cannot be used in combat.] <br>[CONSUMABLE - This item disappears when used.]</tftitemrules>",
      "effects": {
          "RoundsToRegain": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/RuneOfAllegiance_Lesser.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lesser Rune of Allegiance",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_Tier4_Units_And_Gold",
      "associatedTraits": [],
      "composition": [],
      "desc": "4-cost Champion and 4 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_Champ_4c.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "4-cost Champion and 4 Gold",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_ItemArmoryOrnn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Artifact Anvil",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Characters/TFT_ArmoryKeyOrnn/HUD/Icons2D/TFT_ArmoryKeyOrnn_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Artifact Anvil",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_RuneOfAllegiance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on any champion to transfer them to your partner. Any items held will pop off.<br><br>Once used, this item regenerates in @RoundsToRegain@ rounds.<br><br><tftitemrules>[Cannot be used in combat.] <br>[Consumable - this item disappears when used.]</tftitemrules>",
      "effects": {
          "RoundsToRegain": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/RuneOfAllegiance.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rune of Allegiance",
      "unique": false
  },
  {
      "apiName": "TFT_Assist_ChampionDuplicator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champion Duplicator",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/ChampionDuplicator_V.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Champion Duplicator",
      "unique": false
  },
  {
      "apiName": "TFT4_Consumable_KaynBlue",
      "associatedTraits": [],
      "composition": [],
      "desc": "Place on Kayn to free him from Rhaast, permanently improving his Reaping Slash Ability to deal bonus damage at the start of combat.<br><br><tftitemrules>[KAYN CONSUMABLE - This item disappears when used and DESTROYS Rhaast's Embrace]</tftitemrules><br><br><tftitemrules>[Can only be used during the Planning Phase]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT4_Consumable_KaynBlue.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Kayn's Liberation",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_OrnnHullbreaker",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: If there are no adjacent allies, gain @ExtraHealth@ Health.",
      "effects": {
          "AS": 30,
          "Armor": 35,
          "ExtraHealth": 600,
          "MagicResist": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_Hullbreaker.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hullcrusher",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Hush",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_Hush",
      "effects": {
          "MagicResist": 25,
          "Mana": 20,
          "SilenceDuration": 4,
          "{2275757b}": 20,
          "{4516a18d}": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Hush.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_Hush",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Shroud",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Shoot a beam that @CostIncrease@% <TFTKeyword>Mana Reaves</TFTKeyword> enemies.<br><br>Your team gains @BonusAllyHealth@ Health.<br><br><tftitemrules>​​[Support item] [Unique - only 1 per champion]<br><tftbold>Mana Reave</tftbold>: increase maximum Mana until the next cast</tftitemrules>",
      "effects": {
          "BonusAllyHealth": 60,
          "CostIncrease": 30,
          "Health": 150,
          "{4516a18d}": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Shroud_of_Stillness.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shroud of Stillness",
      "unique": true
  },
  {
      "apiName": "TFT_Consumable_ShadowTransformer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Turns all items on a champion into shadow items when used.<br><br><tftitemrules>[CONSUMABLE - This item disappears when used.]</tftitemrules><br><tftitemrules>This Item cannot transform Force of Nature, which is above corruption.</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Consumable_ShadowTransformer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shadow Transformer",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_Arcana_Signifier",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use this on an Arcana champion to change Arcana's effect to theirs. <br><br><scaleLevel>Ahri:</scaleLevel> Gain Ability Power for each 3-star champion.<br><scaleLevel>Hecarim:</scaleLevel> Units holding items gain Damage Reduction and Attack Damage.<br><scaleLevel>Tahm Kench:</scaleLevel> Gain Health for each active trait.<br><scaleLevel>Xerath:</scaleLevel> Abilities deal bonus true damage for each Charm purchased.<br><scaleLevel>Emblem:</scaleLevel> Gain Damage Amp for each Spatula item equipped.<br><br>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_ArcanaSignifier.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Arcana Signifier",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_Faerie_QueensCrownRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "After dealing damage @MaxNumStacks@ times, gain <TFTRadiantItemBonus>@TFTUnitProperty.item:TFT12_Faerie_DamageAmp@%</TFTRadiantItemBonus> %i:scaleDA% for the rest of combat.<br><br><TFTRadiantItemBonus>After dealing damage @RadiantMaxStacks@ times, gain @RadiantMaxHealth*100@% maximum Health, @RadiantOmnivamp*100@% Omnivamp, and @RadiantDamageAmp*100@% damage amp.</TFTRadiantItemBonus><br><br><tftitemrules>Only Faeries can hold this item.</tftitemrules><br><tftitemrules>Bench the champion to remove it.</tftitemrules>",
      "effects": {
          "AD": 0.5,
          "AP": 50,
          "AS": 0.25,
          "MaxNumStacks": 12,
          "RadiantDamageAmp": 0.5,
          "RadiantMaxHealth": 0.20000000298023224,
          "RadiantMaxStacks": 25,
          "RadiantOmnivamp": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieCrown_Radiant.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eternal Monarch's Crown",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_Faerie_QueensCrown",
      "associatedTraits": [],
      "composition": [],
      "desc": "After dealing damage @MaxNumStacks@ times, gain <TFTBonus>@TFTUnitProperty.item:TFT12_Faerie_DamageAmp@%</TFTBonus> %i:scaleDA% for the rest of combat.<br><br><tftitemrules>Only Faeries can hold this item.</tftitemrules><br><tftitemrules>Bench the champion to remove it.</tftitemrules>",
      "effects": {
          "AD": 0.30000001192092896,
          "AP": 30,
          "MaxNumStacks": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieCrown.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Faerie Queen's Crown",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_MilioThreeStar_CursedQuicksilver",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder of this item is stunned. This effect ends when they die. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Shadow/S_Quicksilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cursed Quicksilver",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_Bound_LightSnack",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use this on a Briar to grant her <scaleHealth>@TFTUnitProperty.item:TFT12_BoundHealthGain@ %i:scaleHealth%</scaleHealth> in exchange for @TFTUnitProperty.item:TFT12_BoundHealthCost@ of your player health.<br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {
          "BriarHealthGain": 180,
          "BriarHealthGainDU": 250,
          "BriarHealthGainHR": 250,
          "{0f7b1cb2}": 3,
          "{b7e859b5}": 2,
          "{c8f301d4}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_Ravenous_LightSnack.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "A Light Snack",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_MilioThreeStar_CursedGuinsoosRageblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder of this item sets their attack speed cap to @ASCap@ and cannot gain mana or cast. Every time they are attacked, the attacker gains <TFTBonus>@BonusAttackSpeed*100@%</TFTBonus> Attack Speed. ",
      "effects": {
          "ASCap": 0.10000000149011612,
          "BonusAttackSpeed": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Shadow/S_Guinsoos_Rageblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cursed Guinsoo's Rageblade",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_MilioThreeStar_CursedHextechGunblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder deals @NegativeDamageAmp*100@% less damage. They also take @DamageRatio*100@% of their max health as true damage per second, and heal Milio for the same amount.  ",
      "effects": {
          "DamageRatio": 0.20000000298023224,
          "NegativeDamageAmp": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Shadow/S_Hextech_Gunblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cursed Hextech Gunblade",
      "unique": false
  },
  {
      "apiName": "TFT12_Item_Faerie_Armor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @HealShieldPower*100@% increased healing and shielding. Heal for @QueenHealRatio*100@% of the Queen's damage dealt. <br><br><tftitemrules>Only Faeries can hold this item.</tftitemrules><br><tftitemrules>Bench the champion to remove it.</tftitemrules>",
      "effects": {
          "Armor": 40,
          "HealShieldPower": 0.3499999940395355,
          "Health": 250,
          "MagicResist": 40,
          "QueenHealRatio": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieQueenguardArmor.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Queenguard's Armor",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_Faerie_ArmorRadiant",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain <TFTRadiantItemBonus>@HealShieldPower*100@%</TFTRadiantItemBonus> increased healing and shielding. Heal for <TFTRadiantItemBonus>@QueenHealRatio*100@%</TFTRadiantItemBonus> of the Queen's damage dealt.<br><br><tftitemrules>Only Faeries can hold this item.</tftitemrules><br><tftitemrules>Bench the champion to remove it.</tftitemrules>",
      "effects": {
          "Armor": 60,
          "HealShieldPower": 0.6000000238418579,
          "Health": 1000,
          "MagicResist": 60,
          "QueenHealRatio": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieQueenguardArmor_Radiant.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Armor of Eternal Devotion",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Redemption",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "Heal allies within 1 hex for @MissingHealthHeal@% of their missing Health every @HealTickRate@ seconds. They also gain @AoEDamageReduction@% Durability for @HealTickRate@ seconds (this does not stack).<br><br><TFTTrackerLabel>Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AoEDamageReduction": 10,
          "HealTickRate": 5,
          "Health": 150,
          "HexRadius": 1,
          "Mana": 15,
          "MaxHeal": 1000,
          "MissingHealthHeal": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Redemption.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Redemption",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BansheesVeil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant the holder and allies within @HexRange@ hexes in the same row immunity to crowd control and @BuffAttackSpeed*100@% Attack Speed for @Duration@ seconds.<br><br><tftitemrules>[Support item] [Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "BuffAttackSpeed": 0.25,
          "Duration": 18,
          "Health": 150,
          "HexRange": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Banshees_Veil.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Banshee's Veil",
      "unique": true
  },
  {
      "apiName": "TFT9_Item_OrnnDuskbladeOfDraktharr",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat Start: Leap to the enemy backline. <br><br>Damage from an Ability can critically strike.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AS": 20,
          "CritChance": 35,
          "ProcADPercent": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_ProwlersClaw.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Choncc's Prowler's Claw",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_SugarcraftEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_BFSword"
      ],
      "desc": "The holder gains the Sugarcraft trait.",
      "effects": {
          "AD": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Sugarcraft.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Sugarcraft"
      ],
      "name": "Sugarcraft Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_BlasterEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Blaster trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Artillerist.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Blaster"
      ],
      "name": "Blaster Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_VanguardEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Vanguard trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Vanguard.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Vanguard"
      ],
      "name": "Vanguard Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_ScholarEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Scholar trait.",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Scholar.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Scholar"
      ],
      "name": "Scholar Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_ChronoEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Chrono trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Chrono.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Chrono"
      ],
      "name": "Chrono Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_HoneymancyEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_SparringGloves"
      ],
      "desc": "The holder gains the Honeymancy trait.",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Honeymancy.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Honeymancy"
      ],
      "name": "Honeymancy Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_PreserverEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NegatronCloak",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Preserver trait.",
      "effects": {
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Preserver.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Preserver"
      ],
      "name": "Preserver Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_ArcanaEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Arcana trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Arcana.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Arcana"
      ],
      "name": "Arcana Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_MageEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Mage trait.",
      "effects": {
          "AP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Mage.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Mage"
      ],
      "name": "Mage Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_FaerieEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_Spatula"
      ],
      "desc": "The holder gains the Faerie trait.",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Faerie.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Faerie"
      ],
      "name": "Faerie Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_BastionEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Bastion trait.",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Bastion.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Bastion"
      ],
      "name": "Bastion Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_WarriorEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_SparringGloves",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Warrior trait.",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Warrior.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Warrior"
      ],
      "name": "Warrior Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_IncantorEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Incantor trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Incantor.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Incantor"
      ],
      "name": "Incantor Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_FrostEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_ChainVest"
      ],
      "desc": "The holder gains the Frost trait.",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Frost.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Frost"
      ],
      "name": "Frost Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_WitchcraftEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "The holder gains the Witchcraft trait.",
      "effects": {
          "MagicResist": 20,
          "{71199abe}": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Witchcraft.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Witchcraft"
      ],
      "name": "Witchcraft Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_MultistrikerEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Multistriker trait.",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Multistriker.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Multistriker"
      ],
      "name": "Multistriker Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_ShapeshifterEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_GiantsBelt",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Shapeshifter trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Shapeshifter.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Shapeshifter"
      ],
      "name": "Shapeshifter Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_EldritchEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_GiantsBelt",
          "TFT_Item_Spatula"
      ],
      "desc": "The holder gains the Eldritch trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Eldritch.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Eldritch"
      ],
      "name": "Eldritch Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_PyroEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_RecurveBow"
      ],
      "desc": "The holder gains the Pyro trait.",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Pyro.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Pyro"
      ],
      "name": "Pyro Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_HunterEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_FryingPan"
      ],
      "desc": "The holder gains the Hunter trait.",
      "effects": {
          "AD": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Hunter.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Hunter"
      ],
      "name": "Hunter Emblem",
      "unique": true
  },
  {
      "apiName": "TFT12_Item_PortalEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "The holder gains the Portal trait.",
      "effects": {
          "AP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set12/TFT_Set12_Emblem_Portal.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT12_Portal"
      ],
      "name": "Portal Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_ReaperEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Reaper trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Reaper.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Reaper"
      ],
      "name": "Reaper Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_StoryweaverEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_ChainVest"
      ],
      "desc": "The holder gains the Storyweaver trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Skyweaver.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Storyweaver"
      ],
      "name": "Storyweaver Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_SageEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Sage trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Sage.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Sage"
      ],
      "name": "Sage Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_DragonlordEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Dragonlord trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Dragonlord.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Dragonlord"
      ],
      "name": "Dragonlord Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_DryadEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "The holder gains the Dryad trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Dryad.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Dryad"
      ],
      "name": "Dryad Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_SniperEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Sniper trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Sniper.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Sniper"
      ],
      "name": "Sniper Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_ChallengerEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Duelist trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Duelist.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Duelist"
      ],
      "name": "Duelist Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_UmbralEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_SparringGloves"
      ],
      "desc": "The holder gains the Umbral trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Umbral.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Umbral"
      ],
      "name": "Umbral Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_BehemothEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Behemoth trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Behemoth.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Behemoth"
      ],
      "name": "Behemoth Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_FatedEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "The holder gains the Fated trait.<br><br>Fated Bonus: Restore <keyword>@HPRegen*100@%</keyword> Health every @ProcRate@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "AP": 10,
          "HPRegen": 0.029999999329447746,
          "ProcRate": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Fated.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Fated"
      ],
      "name": "Fated Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_InvokerEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Invoker trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Invoker.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Invoker"
      ],
      "name": "Invoker Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_BruiserEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Bruiser trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Bruiser.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Bruiser"
      ],
      "name": "Bruiser Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_HeavenlyEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "The holder gains the Heavenly trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Heavenly.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Heavenly"
      ],
      "name": "Heavenly Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_FortuneEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Fortune trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Fortune.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Fortune"
      ],
      "name": "Fortune Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_MythicEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "The holder gains the Mythic trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Mythic.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Mythic"
      ],
      "name": "Mythic Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_InkShadowEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Inkshadow trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_InkShadow.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_InkShadow"
      ],
      "name": "Inkshadow Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_WardenEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Warden trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Warden.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Warden"
      ],
      "name": "Warden Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_SpellslingerEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Arcanist trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Arcanist.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Arcanist"
      ],
      "name": "Arcanist Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_GhostlyEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_Spatula"
      ],
      "desc": "The holder gains the Ghostly trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "AD": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Ghostly.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Ghostly"
      ],
      "name": "Ghostly Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_AltruistEmblemItem",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder gains the Altruist trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Altruist.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Altruist"
      ],
      "name": "Altruist Emblem",
      "unique": true
  },
  {
      "apiName": "TFT11_Item_PorcelainEmblemItem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_RecurveBow"
      ],
      "desc": "The holder gains the Porcelain trait.<br><br><tftitemrules>[Unique - only 1 per champion.]</tftitemrules>",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/TFT_Set11_Emblem_Porcelain.tex",
      "id": null,
      "incompatibleTraits": [
          "TFT11_Porcelain"
      ],
      "name": "Porcelain Emblem",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Zephyr",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Summon a whirlwind on the opposite side of the arena that removes the closest enemy from combat for @BanishDuration@ seconds. <br><br>Your team gains @AllyBonusAS@% Attack Speed.<br><br><tftitemrules>[Support item]<br>[Ignores crowd control immunity.]<br>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AllyBonusAS": 8,
          "BanishDuration": 5,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Zephyr.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zephyr",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Hex_Ocean",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_OceanHexBuff",
      "effects": {
          "startingmana": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Hex_Ocean.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_OceanHexBuff",
      "unique": false
  },
  {
      "apiName": "TFT10_Consumable_KaynBlue",
      "associatedTraits": [],
      "composition": [],
      "desc": "Place on Kayn to unlock his Shadow vocal power, permanently improving his Reaping Slash spell to deal bonus damage at the start of combat.<br><br><tftitemrules>[KAYN CONSUMABLE - This item disappears when used and DESTROYS the Fury Guitar]</tftitemrules><br><br><tftitemrules>[Can only be used during the Planning Phase]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT4_Consumable_KaynBlue.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shadow Mic",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnMuramana",
      "associatedTraits": [],
      "composition": [],
      "desc": "After casting the first time in combat, gain @ManaRestore@ Mana over @ManaDuration@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 10,
          "AS": 15,
          "Mana": 15,
          "ManaDuration": 5,
          "ManaRestore": 120
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Marksman_T3_Muramana.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Manazane",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleGoldmancersStaff",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant %i:scaleAP% @AbilityPowerPerGold@ Ability Power per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AbilityPowerGoldMax@ gold) and a @OnKillProcChance*100@% chance to drop %i:goldCoins% @OnKillProcGold@ gold on enemy kill.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AP": 45,
          "AbilityPowerGoldMax": 30,
          "AbilityPowerPerGold": 1,
          "Mana": 15,
          "OnKillProcChance": 0.4000000059604645,
          "OnKillProcGold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/GoldmancersStaff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Goldmancer's Staff",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDeterminedInvestor_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "After dying during combat @StackLimit@ times, this item is destroyed. Upon destruction, grant the item Diamond Hands, 1 Champion Duplicator, and %i:goldCoins% @GoldGranted@ gold.",
      "effects": {
          "GoldGranted": 5,
          "Health": 150,
          "StackLimit": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DeterminedInvestor_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Determined Investor",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleMogulsMail_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grants @BaseResistsPerStack@ Armor, @BaseResistsPerStack@ Magic Resist, and @BaseHealthPerStack@ Health when taking damage, stacking up to @StackCap@ times.<br><br>At full stacks, grant %i:goldCoins% @GoldAtFullStacks@ gold and continue gaining %i:goldCoins% 1 gold every @GoldInterval@ seconds.<br><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@<br>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "BaseHealthPerStack": 5,
          "BaseResistsPerStack": 1,
          "GoldAtFullStacks": 3,
          "GoldInterval": 9,
          "Health": 50,
          "StackCap": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/Moguls_Mail.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mogul's Mail",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleMogulsMail",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grants @BaseResistsPerStack@ Armor, @BaseResistsPerStack@ Magic Resist, and @BaseHealthPerStack@ Health when taking damage, stacking up to @StackCap@ times.<br><br>At full stacks, grant %i:goldCoins% @GoldAtFullStacks@ gold and continue gaining %i:goldCoins% 1 gold every @GoldInterval@ seconds.<br><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@<br>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "BaseHealthPerStack": 5,
          "BaseResistsPerStack": 1,
          "GoldAtFullStacks": 1,
          "GoldInterval": 9,
          "Health": 50,
          "StackCap": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/Moguls_Mail.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mogul's Mail",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleGamblersBlade_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant %i:scaleAS% @AttackSpeedPerGold*100@% bonus Attack Speed per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AttackSpeedGoldLimit@ gold).<br><br>Each attack has a @ChanceToProc*100@% chance to drop %i:goldCoins% @GoldPerProc@ gold.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AP": 10,
          "AS": 15,
          "AttackSpeedGoldLimit": 15,
          "AttackSpeedPerGold": 0.029999999329447746,
          "ChanceToProc": 0.10000000149011612,
          "GoldPerProc": 1,
          "{46736b3f}": 4,
          "{b38e1643}": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT10_GamblersBlade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gambler's Blade",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleHeartOfGold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseBonusDamage*100@% Damage Amp. Each second the holder is alive, your team gains an additional @AmpPerSec*100@% Damage Amp, up to a total of @MaxDamageAmp*100@%.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "AmpPerSec": 0.009999999776482582,
          "BaseBonusDamage": 0.05000000074505806,
          "Health": 150,
          "MaxDamageAmp": 0.20000000298023224,
          "ProcTimeInSeconds": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Needlessy_Large_Gem.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Needlessly Big Gem",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDravensAxe_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain %i:scaleAD% @AttackDamagePerGold@% Attack Damage per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AttackDamageGoldLimit@ gold).<br><br>Attacks grant @StacksPerAttack@ stack, up to @CashoutStacks@ times. At full stacks, grant %i:goldCoins% @CashoutGold@ gold.<br><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AD": 0.15000000596046448,
          "AS": 10,
          "AttackDamageGoldLimit": 15,
          "AttackDamagePerGold": 3,
          "CashoutGold": 5,
          "CashoutStacks": 50,
          "StacksPerAttack": 1,
          "{08083372}": "null",
          "{fd493b8a}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DravensAxe_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Draven's Axe",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDiamondHands_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat: At @HPThreshold1*100@% Health, become invulnerable for @BaseDamageImmunityTime@ seconds and grant %i:goldCoins% @GoldPerImmunityProc@ gold.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AP": 25,
          "BaseDamageImmunityTime": 1.5,
          "GoldPerImmunityProc": 2,
          "HPThreshold1": 0.5,
          "Health": 200,
          "{3205531e}": -2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT10_DiamondHands.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Diamond Hands",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDravensAxe",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain %i:scaleAD% @AttackDamagePerGold@% Attack Damage per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AttackDamageGoldLimit@ gold).<br><br>Attacks grant @StacksPerAttack@ stack, up to @CashoutStacks@ times. At full stacks, grant %i:goldCoins% @CashoutGold@ gold.<br><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AD": 0.15000000596046448,
          "AS": 10,
          "AttackDamageGoldLimit": 60,
          "AttackDamagePerGold": 1,
          "CashoutGold": 9,
          "CashoutStacks": 100,
          "StacksPerAttack": 1,
          "{08083372}": "null",
          "{fd493b8a}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DravensAxe_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Draven's Axe",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleGamblersBlade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant %i:scaleAS% @AttackSpeedPerGold*100@% bonus Attack Speed per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AttackSpeedGoldLimit@ gold).<br><br>Each attack has a @ChanceToProc*100@% chance to drop %i:goldCoins% @GoldPerProc@ gold.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AP": 10,
          "AS": 40,
          "AttackSpeedGoldLimit": 30,
          "AttackSpeedPerGold": 0.009999999776482582,
          "ChanceToProc": 0.03999999910593033,
          "GoldPerProc": 1,
          "{46736b3f}": 4,
          "{b38e1643}": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT10_GamblersBlade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gambler's Blade",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDeterminedInvestor",
      "associatedTraits": [],
      "composition": [],
      "desc": "After dying during combat @StackLimit@ times, this item is destroyed. Upon destruction, grant the item Diamond Hands, 1 Champion Duplicator, and %i:goldCoins% @GoldGranted@ gold.",
      "effects": {
          "GoldGranted": 5,
          "Health": 150,
          "StackLimit": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DeterminedInvestor_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Determined Investor",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleHeartOfGold_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseBonusDamage*100@% Damage Amp. Each second the holder is alive, your team gains an additional @AmpPerSec*100@% Damage Amp, up to a total of @MaxDamageAmp*100@%.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BaseBonusDamage": 0.25,
          "BonusDamagePerGold": 0.029999999329447746,
          "GoldLimit": 15,
          "Health": 250,
          "ProcTimeInSeconds": 15,
          "UnitsPerGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_HeartOfGold_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Needlessly Big Gem",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleGoldmancersStaff_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant %i:scaleAP% @AbilityPowerPerGold@ Ability Power per %i:goldCoins% gold in your bank (up to %i:goldCoins% @AbilityPowerGoldMax@ gold) and a @OnKillProcChance*100@% chance to drop %i:goldCoins% @OnKillProcGold@ gold on enemy kill.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br><tftitemrules>Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@</tftitemrules>",
      "effects": {
          "AP": 30,
          "AbilityPowerGoldMax": 0.5,
          "AbilityPowerPerGold": 15,
          "Mana": 15,
          "OnKillProcChance": 4,
          "OnKillProcGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/GoldmancersStaff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Goldmancer's Staff",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleDiamondHands",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat: At @HPThreshold1*100@% Health, become invulnerable for @BaseDamageImmunityTime@ seconds and grant %i:goldCoins% @GoldPerImmunityProc@ gold.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AP": 25,
          "BaseDamageImmunityTime": 1.5,
          "GoldPerImmunityProc": 1,
          "HPThreshold1": 0.5,
          "Health": 200,
          "{3205531e}": -2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT10_DiamondHands.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Diamond Hands",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_ShimmerscaleCrownOfChampions",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @SecondsForEmpoweredAttack@ seconds, the next attack deals @AttackGoldMultiplier@x the amount of %i:goldCoins% gold in your bank in true damage.",
      "effects": {
          "AttackGoldMultiplier": 9001,
          "Health": 100,
          "SecondsForEmpoweredAttack": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_CrownOfChampions_Base.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crown Of Champions",
      "unique": true
  },
  {
      "apiName": "TFT9_Item_OrnnTrickstersGlass",
      "associatedTraits": [],
      "composition": [],
      "desc": "Summon a clone with @HealthPercent@% max Health and +@ManaIncrease*100@% max Mana. You cannot equip items to the clone.<br><br><tftitemrules>The clone benefits from active traits</tftitemrules><br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules><br>",
      "effects": {
          "AS": 10,
          "Armor": 10,
          "CritChance": 15,
          "HealthPercent": 70,
          "MagicResist": 10,
          "ManaIncrease": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_TrickstersGlass.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trickster's Glass",
      "unique": true
  },
  {
      "apiName": "TFT_Item_TacticiansRing",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_FryingPan"
      ],
      "desc": "Your team gains +@MaxArmySizeIncrease@ max team size.<br><br>@PercentGoldChance@% chance to drop 1 gold after @Timer@ seconds of combat.<br><br><tftitemrules>\"...and a bit of Luck.\"</tftitemrules>",
      "effects": {
          "MaxArmySizeIncrease": 1,
          "PercentGoldChance": 10,
          "Timer": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Tacticians_Ring.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tactician's Cape",
      "unique": false
  },
  {
      "apiName": "TFT11_Storyweaver7_AP",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kayle deals @DamageAmpPercent*100@% more damage. When she casts, she fires two waves.",
      "effects": {
          "DamageAmpPercent": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AbilityPower3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tome of Power",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver7_AS",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kayle deals @DamageAmpPercent*100@% more damage. Her attacks now hit in a @HexRadius@-hex radius around the target",
      "effects": {
          "DamageAmpPercent": 0.20000000298023224,
          "HexRadius": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AttackSpeed3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tome of Swiftness",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver3_Support",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kayle's damaging attacks and abilities @ResistPercent*100@% <TFTKeyword>Shred</TFTKeyword> and <TFTKeyword>Sunder</TFTKeyword> enemies hit for @Duration@ seconds.",
      "effects": {
          "Duration": 3,
          "ResistPercent": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_Support1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Talisman of Aid",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver9_Ascended",
      "associatedTraits": [],
      "composition": [],
      "desc": "This will change EVERYTHING.",
      "effects": {
          "AD": 5,
          "AP": 250,
          "AS": 2,
          "Armor": 200,
          "HP": 2000,
          "MagicResist": 200,
          "{63a4b712}": 500,
          "{bd7eea9a}": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_Ascension.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Amulet of Ascension",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver7_Support",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @Duration@ seconds, revive the strongest ally that hasn't been revived yet at @HPPercent*100@% of their maximum Health.",
      "effects": {
          "Duration": 7,
          "HPPercent": 0.5,
          "{d76b8ef7}": 2000
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_Support3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tome of Mending",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver5_AS",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks grant Kayle @ASAmt*100@% stacking Attack Speed.",
      "effects": {
          "ASAmt": 0.05999999865889549,
          "{937db108}": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AttackSpeed2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scroll of Haste",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver5_AP",
      "associatedTraits": [],
      "composition": [],
      "desc": "Kayle's Ability hits a wider area and deals @APAmt*100@% more damage.",
      "effects": {
          "APAmt": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AbilityPower2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scroll of Force",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver3_AP",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant Kayle and adjacent allies in the same row @APAmt@ Ability Power at the start of combat.",
      "effects": {
          "APAmt": 20,
          "HexRange": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AbilityPower1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Talisman of Might",
      "unique": true
  },
  {
      "apiName": "TFT11_Storyweaver3_AS",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant Kayle and adjacent allies in the same row @ASAmt*100@% Attack Speed at the start of combat.",
      "effects": {
          "ASAmt": 0.11999999731779099,
          "HexRange": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_StoryweaverItems/TFT11_Storyweaver_AttackSpeed1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Talisman of Speed",
      "unique": true
  },
  {
      "apiName": "TFT_Consumable_ItemReroller",
      "associatedTraits": [],
      "composition": [],
      "desc": "Unequip all items and randomly transform them into new ones of a similar type and quality.<br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemReroller.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reforger",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BladeOfTheRuinedKing",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_BladeOfTheRuinedKing",
      "effects": {
          "AS": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_BladeOfTheRuinedKing.tex",
      "id": null,
      "incompatibleTraits": [
          "Blademaster"
      ],
      "name": "TFT_item_name_BladeOfTheRuinedKing",
      "unique": true
  },
  {
      "apiName": "TFT_Item_ZekesHerald",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant %i:scaleAS% @AttackSpeed@% Attack Speed to the holder and allies within 2 hexes in the same row.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "AttackSpeed": 30,
          "Health": 150,
          "HexRange": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Zekes_Herald.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zeke's Herald",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ThiefsGloves",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_SparringGloves",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Each round: Equip 2 random items.<br><br><tftitemrules>[Consumes 3 item slots.]</tftitemrules>",
      "effects": {
          "CritChance": 20,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Thieves_Gloves.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thief's Gloves",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GuinsoosRageblade",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "Attacks grant @AttackSpeedPerStack@% stacking Attack Speed.",
      "effects": {
          "AP": 10,
          "AS": 10,
          "AttackSpeedPerStack": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Guinsoos_Rageblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guinsoo's Rageblade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_IonicSpark",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "@MRShred@% <TFTKeyword>Shred</TFTKeyword> enemies within @HexRange@ hexes. When enemies cast an Ability, deal magic damage equal to @ManaRatio@% of the Mana spent.<br><br><tftitemrules><tftbold>Shred</tftbold>: Reduce Magic Resist</tftitemrules>",
      "effects": {
          "AP": 15,
          "Damage": 250,
          "Health": 100,
          "HexRange": 2,
          "MRShred": 30,
          "MagicResist": 25,
          "ManaRatio": 160
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Ionic_Spark.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ionic Spark",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SteraksGage",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "Once per combat at @HealthThreshold@% Health, gain @BonusMaxHealthPerc@% max Health and @BonusADToGive@% Attack Damage.",
      "effects": {
          "AD": 0.15000000596046448,
          "BonusADToGive": 35,
          "BonusMaxHealthPerc": 25,
          "Health": 150,
          "HealthThreshold": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Steraks_Gage.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sterak's Gage",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DragonsClaw",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NegatronCloak",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "Gain @PercentMaxHP*100@% max health.<br><br>Every @HealthRegenInterval@ seconds, heal @PercentHealthDamage@% max Health.",
      "effects": {
          "HealthRegenInterval": 2,
          "ICD": 0.5,
          "MagicResist": 65,
          "PercentHealthDamage": 2.5,
          "PercentMaxHP": 0.09000000357627869
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Dragons_Claw.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dragon's Claw",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_ItemRemover",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to unequip all items. <br><br><tftitemrules> [Cannot be used on champions in combat.]<br>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemRemover.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magnetic Remover",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugFirstHit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Cause this unit to deal @TFTUnitProperty.:TFT_UnitProperty_Debug@% damage on their next attack.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/TFT6_Augment_YordleSmallButMighty.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ace",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_LichBane",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder's first attack after each Ability cast deals @TFTUnitProperty.item:TFT_Item_Artifact_LichBane_Damage@ bonus magic damage.<br><br><tftitemrules>Damage increases based on Stage.</tftitemrules>",
      "effects": {
          "AP": 30,
          "Mana": 15,
          "{9b6d43b2}": 480,
          "{9d6d46d8}": 480,
          "{9e6d486b}": 480,
          "{9f6d49fe}": 340,
          "{a06d4b91}": 410,
          "{a16d4d24}": 200,
          "{a26d4eb7}": 270,
          "{a46d51dd}": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_LichBane.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lich Bane",
      "unique": false
  },
  {
      "apiName": "TFT_Item_PhantomDancer",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_PhantomDancer",
      "effects": {
          "AS": 15,
          "Armor": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_PhantomDancer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT_item_name_PhantomDancer",
      "unique": true
  },
  {
      "apiName": "TFT_Item_PowerGauntlet",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_GiantsBelt",
          "TFT_Item_SparringGloves"
      ],
      "desc": "After damaging a Shield, gain @DamageAmp*100@% Damage Amp for @Duration@ seconds.",
      "effects": {
          "AP": 10,
          "AS": 20,
          "CritChance": 20,
          "DamageAmp": 0.25,
          "DamageAmpPct": 25,
          "Duration": 3,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Stridebreaker.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guardbreaker",
      "unique": false
  },
  {
      "apiName": "TFT_DifficultyChoice_Normal",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Normal Mode",
      "unique": false
  },
  {
      "apiName": "TFT_DifficultyChoice_Chaos",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chaos Mode",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BlankSlot",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_FracturedMirrorEmptySlot",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Placeholders/TFT_Item_EmptySlot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "",
      "unique": false
  },
  {
      "apiName": "TFT_Item_EmptyBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_FracturedMirrorEmptySlot",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Placeholders/TFT_Item_EmptySlot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_TrashToTreasure_Reforger",
      "associatedTraits": [],
      "composition": [],
      "desc": "Unequip all items and randomly transform them into new ones of a similar type and quality.<br><TFTRadiantItemBonus>Trash to Treasure: Completed items transform into Artifacts and do not consume the Reforger</TFTRadiantItemBonus><br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemReroller.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reforger",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_LightTransformer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Turns all items on a champion into standard items when used.<br><br><tftitemrules>[CONSUMABLE - This item disappears when used.]</tftitemrules><br><tftitemrules>This Item cannot transform Force of Darkness, which is beyond redemption.</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Consumable_LightTransformer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Light Transformer",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SentinelSwarm",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every 3 seconds, summon a powerful Sentinel equipped with Completed, Artifact, and Radiant items.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Spatula.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sentinel Swarm",
      "unique": false
  },
  {
      "apiName": "TFT4_Consumable_KaynRed",
      "associatedTraits": [],
      "composition": [],
      "desc": "Place on Kayn to force Rhaast to overtake him, permanently improving his Reaping Slash spell to heal him.<br><br><tftitemrules>[KAYN CONSUMABLE - This item disappears when used and DESTROYS Kayn's Liberation]</tftitemrules><br><br><tftitemrules>[Can only be used during the Planning Phase]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT4_Consumable_KaynRed.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rhaast's Embrace",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_ForbiddenIdol",
      "associatedTraits": [],
      "composition": [],
      "desc": "Shields have @PercentShieldConversion@% of their value converted to max Health instead.",
      "effects": {
          "Armor": 25,
          "Health": 200,
          "MagicResist": 25,
          "PercentShieldConversion": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_ForbiddenIdol.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Forbidden Idol",
      "unique": false
  },
  {
      "apiName": "TFT9_Consumable_EagleEye_MagicResist",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains temporary magic resist.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Dragonmancer/TFT7_Consumable_Dragonmancer_DragonBlessing.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eagle's Antimagic",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugShield",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant a @TFTUnitProperty.:TFT_UnitProperty_Debug@ health shield.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/DU_Augment_SpeedySupport.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pengu's Protection",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_NeekosHelp",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to create a 1-star copy on your bench.<br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/ChampionDuplicator_V.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Champion Duplicator",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_BlueBuff",
      "associatedTraits": [],
      "composition": [],
      "desc": "Max mana reduced by @ManaReduction@. <br><br>When the holder gets a takedown, they deal @DamageAmp*100@% more damage for @TakedownTimer@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "Mana": 30,
          "ManaRestore": 50,
          "{71bc3700}": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Blue_Buff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Buff",
      "unique": true
  },
  {
      "apiName": "TFTTutorial_Item_GuinsoosRageblade",
      "associatedTraits": [],
      "composition": [
          "TFTTutorial_Item_NeedlesslyLargeRod",
          "TFTTutorial_Item_RecurveBow"
      ],
      "desc": "Attacks grant %i:scaleAS% @AttackSpeedPerStack@% bonus Attack Speed. This effect stacks.",
      "effects": {
          "AP": 10,
          "AS": 18,
          "AttackSpeedPerStack": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Guinsoos_Rageblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guinsoo's Rageblade",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_RecurveBow",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAS% +@AS@% Attack Speed",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Recurve_Bow.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Recurve Bow",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_NeedlesslyLargeRod",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAP% +@AP@ Ability Power",
      "effects": {
          "AP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Needlessly_Large_Rod.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Needlessly Large Rod",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_ChainVest",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleArmor% +@Armor@ Armor",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Chain_Vest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chain Vest",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_BFSword",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAD% +@AD@ Attack Damage",
      "effects": {
          "AD": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/BF_Sword.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "B.F. Sword",
      "unique": false
  },
  {
      "apiName": "TFTTutorial_Item_GuardianAngel",
      "associatedTraits": [],
      "composition": [
          "TFTTutorial_Item_BFSword",
          "TFTTutorial_Item_ChainVest"
      ],
      "desc": "Prevents the holder's first death, placing them in stasis instead. After @StasisDuration@ seconds, they return with @HealthRestore@ Health and shed all negative effects.<br><br><tftitemrules>[Unique - Only One Per Champion]</tftitemrules>",
      "effects": {
          "AD": 10,
          "Armor": 20,
          "HealthRestore": 400,
          "StasisDuration": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Guardian_Angel.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Guardian Angel",
      "unique": true
  },
  {
      "apiName": "TFT_Item_DebugDamage",
      "associatedTraits": [],
      "composition": [],
      "desc": "Deal @TFTUnitProperty.:TFT_UnitProperty_Debug@ damage.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/TFT6_Augment_BrawlerVeterans.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portable Pain",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Thornmail",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Thornmail",
      "effects": {
          "Armor": 50,
          "{6688a0d5}": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Thornmail.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "game_item_displayname_3075",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugStun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Stun for @TFTUnitProperty.:TFT_UnitProperty_Debug@ seconds.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/TFT6_Augment_ClockworkOverclock.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hammer to the Face",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowOx",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks heal the holder for @HealthRatio*100@% of their max Health and deal the same amount as bonus magic damage.",
      "effects": {
          "Health": 350,
          "HealthRatio": 0.029999999329447746
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Vitality.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Vitality",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowHorse",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever the holder acquires a new target they run quickly to and briefly stun them, dealing @Damage@ magic damage, and double the stats from this item for @BuffDuration@ seconds.",
      "effects": {
          "Armor": 35,
          "BuffDuration": 4,
          "Damage": 250,
          "MagicResist": 35,
          "StunDuration": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Force.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Force",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowRat",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every 3rd attack fires bolts at the 2 lowest percent health enemies which deal @ADPercent@% Attack Damage as physical damage.",
      "effects": {
          "AD": 0.25,
          "ADPercent": 60,
          "AS": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Bombardment.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Bombardment",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowPig",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a @HealthShieldRatio*100@% Shield after casting the first time each combat. When it breaks, grant @AllyShieldRatio*100@% of this shield amount to the 2 nearest allies.",
      "effects": {
          "AllyShieldRatio": 0.5,
          "Health": 250,
          "HealthShieldRatio": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Protection.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Protection",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowSnake",
      "associatedTraits": [],
      "composition": [],
      "desc": "Damage applies a toxin that deals an additional @DamageRatio*100@% of that damage over @Duration@ seconds and @HealingReductionPct@% <TFTKeyword>Wounds</TFTKeyword> the target.<br><br><tftitemrules><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "AD": 0.25,
          "AP": 25,
          "DamageRatio": 0.33000001311302185,
          "Duration": 3,
          "HealingReductionPct": 33
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Toxin.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Toxin",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_InkshadowTiger",
      "associatedTraits": [],
      "composition": [],
      "desc": "Deal @BonusRatio*100@% bonus damage to targets below half health. On takedown, gain @AttackSpeedPercent@% attack speed for @Duration@ seconds.",
      "effects": {
          "AS": 30,
          "AttackSpeedPercent": 40,
          "BonusRatio": 0.3499999940395355,
          "Duration": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT11_InkShadowItems/TFT11_Inkshadow_Fury.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tattoo of Fury",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_Fishbones",
      "associatedTraits": [],
      "composition": [],
      "desc": "Doubles the holder's attack range, and causes each of their attacks to target a random enemy.",
      "effects": {
          "AD": 0.4000000059604645,
          "AS": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_Fishbones.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fishbones",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnAnimaVisage",
      "associatedTraits": [],
      "composition": [],
      "desc": "Heal @PercentHealthRegen@% max Health every second.",
      "effects": {
          "Health": 450,
          "MagicResist": 25,
          "PercentHealthRegen": 2.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Tank_T3_SpiritVisage.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Anima Visage",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GargoyleStoneplate",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "Gain @ArmorPerEnemy@ Armor and @MRPerEnemy@ Magic Resist for each enemy targeting the holder.",
      "effects": {
          "Armor": 25,
          "ArmorPerEnemy": 10,
          "Health": 100,
          "MRPerEnemy": 10,
          "MagicResist": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Gargoyle_Stoneplate.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gargoyle Stoneplate",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BrambleVest",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_ChainVest"
      ],
      "desc": "Gain @PercentMaxHP*100@% max health.<br><br>Take @AutoDamageReduction*100@% reduced damage from attacks. When struck by any attack, deal <magicDamage>@1StarAoEDamage@ magic damage</magicDamage> to all adjacent enemies.<br><br><tftitemrules>Cooldown: @ICD@ seconds</tftitemrules>",
      "effects": {
          "1StarAoEDamage": 100,
          "2StarAoEDamage": 100,
          "3StarAoEDamage": 100,
          "Armor": 55,
          "AutoDamageReduction": 0.07999999821186066,
          "ICD": 2,
          "PercentMaxHP": 0.05000000074505806,
          "{6688a0d5}": 100,
          "{b5c2a66b}": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Bramble_Vest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bramble Vest",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugBase",
      "associatedTraits": [],
      "composition": [],
      "desc": "Error 404: Debug command not found.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/DU_Augment_MysteryGift.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "MissingNo",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ChainVest",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleArmor% +@Armor@ Armor",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Chain_Vest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chain Vest",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnRocketPropelledFist",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: The farthest enemy is pulled into melee range and <TFTKeyword>Stunned</TFTKeyword> for @StunDuration@ seconds. Allies within range will prioritize attacking that enemy.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Stun</tftbold>: cannot move, attack, or cast Abilities</tftitemrules>",
      "effects": {
          "Armor": 25,
          "Health": 150,
          "Mana": 15,
          "StunDuration": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_RocketPropelledFist.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Choncc's Rocket-Propelled Fist",
      "unique": true
  },
  {
      "apiName": "TFT_Item_IcebornGauntlet",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_FrozenFist",
      "effects": {
          "Armor": 25,
          "DodgeChance": 20,
          "FreezeDuration": 2.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_IcebornGauntlet.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_FrozenFist",
      "unique": false
  },
  {
      "apiName": "TFT9_Consumable_EagleEye_Armor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains temporary armor.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set8_MechaPrime/TFT8_MechaPrime_Consumable.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eagle's Armor",
      "unique": false
  },
  {
      "apiName": "TFT10_Consumable_KaynRed",
      "associatedTraits": [],
      "composition": [],
      "desc": "Place on Kayn to unleash his Fury Rapper energy, permanently improving his Reaping Slash Ability to heal him.<br><br><tftitemrules>[KAYN CONSUMABLE - This item disappears when used and DESTROYS the Shadow Mic]</tftitemrules><br><br><tftitemrules>[Can only be used during the Planning Phase]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT4_Consumable_KaynRed.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fury Guitar",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SpellThiefsEdge",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_SpellThiefsEdge",
      "effects": {
          "{0cc88d45}": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_SpellThiefsEdge.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_SpellThiefsEdge",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_UnendingDespair",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever a Shield on the holder breaks, @PercentDamage@% of that Shield's initial value is dealt to the nearest enemy as magic damage.",
      "effects": {
          "Armor": 40,
          "Health": 400,
          "PercentDamage": 125
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_UnendingDespair.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unending Despair",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnEternalWinter",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies who damage the holder are @AttackSpeedSlowPercent@% <TFTKeyword>Chilled</TFTKeyword> for @SlowDuration@ seconds. After @NumApplications@ <TFTKeyword>Chills</TFTKeyword> from this item, the attacker is <TFTKeyword>Stunned</TFTKeyword> instead (Cooldown: @FreezeCooldown@ seconds).<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Chill</tftbold>: reduce Attack Speed<br><tftbold>Stun</tftbold>: cannot move, attack, or cast Abilities</tftitemrules>",
      "effects": {
          "Armor": 20,
          "AttackSpeedSlowPercent": 20,
          "FreezeCooldown": 15,
          "FreezeDuration": 1.5,
          "Health": 200,
          "NumApplications": 7,
          "SlowDuration": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Mage_T4_Everfrost.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Eternal Winter",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Catalyst",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_Catalyst",
      "effects": {
          "DodgeChance": 20,
          "Mana": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_GiantSlayer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT_item_name_Catalyst",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Hex_Wind",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_WindHexBuff",
      "effects": {
          "{0e4779e5}": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Hex_Wind.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_WindHexBuff",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_BaronsHead",
      "associatedTraits": [],
      "composition": [],
      "desc": "<tftitemrules>The terror from the Void was no match for the ingenuity, firepower, and weapons of dubious legality from Piltover.</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_MiscItems/Baron_Square.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Baron Nashor's Head",
      "unique": false
  },
  {
      "apiName": "TFT8_Item_ArsenalRedGun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aphelios enters an onslaught, slinging chakrams and dealing massive damage to nearby enemies.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/TFT8/TFT8_Item_ArsenalRedGun.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Onslaught",
      "unique": false
  },
  {
      "apiName": "TFT8_Item_ArsenalBlueGun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aphelios unleashes a wave of energy in a cone in his target's direction, locking onto and dealing damage to all enemies hit. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/TFT8/TFT8_Item_ArsenalBlueGun.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Duskwave",
      "unique": false
  },
  {
      "apiName": "TFT8_Item_ArsenalPurpleGun",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aphelios casts forth a lunar spotlight towards the largest group of units, stunning all enemies hit and dealing damage to them. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/TFT8/TFT8_Item_ArsenalPurpleGun.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Binding Eclipse",
      "unique": false
  },
  {
      "apiName": "TFT_Item_RecurveBow",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAS% +@AS@% Attack Speed",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Recurve_Bow.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Recurve Bow",
      "unique": false
  },
  {
      "apiName": "TFT_Item_MadredsBloodrazor",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_RecurveBow"
      ],
      "desc": "Gain @DamageAmp*100@% Damage Amp against enemies with more than @HealthThreshold@ max Health.",
      "effects": {
          "AD": 0.25,
          "AP": 25,
          "AS": 10,
          "DamageAmp": 0.25,
          "HealthThreshold": 1750,
          "LargeBonusPct": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Giant_Slayer.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant Slayer",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Blank",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Transparent.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": null,
      "unique": false
  },
  {
      "apiName": "TFT3_Item_BlademasterEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_BFSword"
      ],
      "desc": "The holder gains the Blademaster trait.",
      "effects": {
          "AD": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Blademaster.tex",
      "id": null,
      "incompatibleTraits": [
          "Set3_Blademaster"
      ],
      "name": "Blademaster Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_StarGuardianEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "The holder gains the Star Guardian trait.",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/StarGuardian.tex",
      "id": null,
      "incompatibleTraits": [
          "StarGuardian"
      ],
      "name": "Star Guardian Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_BattlecastEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "The holder gains the Battlecast trait.",
      "effects": {
          "AP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Battlecast.tex",
      "id": null,
      "incompatibleTraits": [
          "Battlecast"
      ],
      "name": "Battlecast Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_InfiltratorEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_RecurveBow"
      ],
      "desc": "The holder gains the Infiltrator trait.",
      "effects": {
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Infiltrator.tex",
      "id": null,
      "incompatibleTraits": [
          "Infiltrator"
      ],
      "name": "Infiltrator Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_CelestialEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "The holder gains the Celestial trait.",
      "effects": {
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Celestial.tex",
      "id": null,
      "incompatibleTraits": [
          "Set3_Celestial"
      ],
      "name": "Celestial Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_RebelEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_ChainVest"
      ],
      "desc": "The holder gains the Rebel trait.",
      "effects": {
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Rebel.tex",
      "id": null,
      "incompatibleTraits": [
          "Rebel"
      ],
      "name": "Rebel Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_DarkStarEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_SparringGloves"
      ],
      "desc": "The holder gains the Dark Star trait.",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/DarkStar.tex",
      "id": null,
      "incompatibleTraits": [
          "DarkStar"
      ],
      "name": "Dark Star Emblem",
      "unique": true
  },
  {
      "apiName": "TFT3_Item_ProtectorEmblem",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "The holder gains the Protector trait.",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set3/Protector.tex",
      "id": null,
      "incompatibleTraits": [
          "Protector"
      ],
      "name": "Protector Emblem",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Hex_Inferno",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_InfernoHex",
      "effects": {
          "AttackSpeedPercent": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Hex_Inferno.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_InfernoHexBuff",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnObsidianCleaver",
      "associatedTraits": [],
      "composition": [],
      "desc": "Damage dealt @Shred@% <TFTKeyword>Shreds</TFTKeyword> and @Shred@% <TFTKeyword>Sunders</TFTKeyword> enemies for @Duration@ seconds.<br><br>Your team gains @TeamAD*100@% Attack Damage and @TeamAP@ Ability Power.<br><br><tftitemrules>​​[Support item] [Unique - only 1 per champion]<br><tftbold>Shred</tftbold>: Reduce Magic Resist<br><tftbold>Sunder</tftbold>: Reduce Armor</tftitemrules>",
      "effects": {
          "Duration": 15,
          "Health": 150,
          "Shred": 30,
          "TeamAD": 0.07999999821186066,
          "TeamAP": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Obsidian_Cleaver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Obsidian Cleaver",
      "unique": true
  },
  {
      "apiName": "TFT_Item_RedBuff",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "Every @ICD@ seconds, deal @BurnPercent@% <TFTKeyword>Burn</TFTKeyword> and @GrievousWoundsPercent@% <TFTKeyword>Wound</TFTKeyword> to an enemy within @HexRange@ hexes for @BurnDuration@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "Armor": 20,
          "BurnDuration": 10,
          "BurnPercent": 1,
          "GrievousWoundsPercent": 33,
          "Health": 250,
          "HexRange": 2,
          "ICD": 2,
          "MonsterCap": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Sunfire_Cape.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sunfire Cape",
      "unique": true
  },
  {
      "apiName": "TFT_Item_RadiantVirtue",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @HealTickRate@ seconds, heal your team for @MaxHealthHeal@% of their max Health. When the holder dies, the healing increases to @TOOLTIPEmpoweredHeal@% max Health for @NumBonusHeals@ extra heals.<br><br><TFTTrackerLabel>Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight><br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "HealTickRate": 5,
          "Health": 150,
          "MaxHeal": 1000,
          "MaxHealthHeal": 7,
          "NumBonusHeals": 2,
          "PostDeathDuration": 15,
          "TOOLTIPEmpoweredHeal": 14,
          "{484836f3}": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Radiant_Virtue.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Virtue of the Martyr",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_Dissolver",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to break apart all items into components and unequip them.<br><br><tftitemrules> [Cannot be used on board champions in combat.]<br>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Consumable_Dissolver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Divine Dissolver",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SwordOfTheDivine",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_SwordOfTheDivine2",
      "effects": {
          "ChanceToProc": 7,
          "{98ac43ce}": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_SwordOfTheDivine.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_SwordOfTheDivine2",
      "unique": false
  },
  {
      "apiName": "TFT_Item_UnstableConcoction",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Gain 2 effects:<li>@BaseAD*100@% Attack Damage and @BaseSP@ Ability Power.<li>@Omnivamp*100@% Omnivamp<br><br>Each round, randomly double 1 of these effects.",
      "effects": {
          "BaseAD": 0.15000000596046448,
          "BaseHeal": 15,
          "BaseSP": 15,
          "BonusSP": 15,
          "CritChance": 20,
          "Mana": 15,
          "Omnivamp": 0.15000000596046448,
          "{693a77ae}": 0.15000000596046448,
          "{a60806db}": 66.66699981689453
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Hand_of_Justice.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hand Of Justice",
      "unique": false
  },
  {
      "apiName": "TFT_Item_CursedBlade",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_CursedBlade",
          "TFT_Item_CursedBlade"
      ],
      "desc": "TFT_item_description_CursedBlade",
      "effects": {
          "AS": 15,
          "MagicResist": 25,
          "{a56e0a21}": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_CursedBlade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_CursedBlade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GuardianAngel",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_ChainVest"
      ],
      "desc": "Once per combat: At @HealthThreshold@% Health, briefly become untargetable and shed negative effects. Then, gain @AttackSpeed@% bonus Attack Speed.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.10000000149011612,
          "Armor": 20,
          "AttackSpeed": 15,
          "DamageReduction": 100,
          "HealthThreshold": 60,
          "StealthDuration": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Edge_Of_Night.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Edge of Night",
      "unique": true
  },
  {
      "apiName": "TFT_Item_SeraphsEmbrace",
      "associatedTraits": [],
      "composition": [],
      "desc": "Max mana reduced by @ManaReduction@. <br><br>When the holder gets a takedown, they deal @DamageAmp*100@% more damage for @TakedownTimer@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AP": 10,
          "Mana": 40,
          "ManaOnTakedown": 10,
          "ManaReduction": 10,
          "TakedownTimer": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Blue_Buff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Buff",
      "unique": true
  },
  {
      "apiName": "TFT_Item_CrestOfCinders",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: the holder and allies within @HexRange@ hexes in the same row gain the Crest of Cinders.<br><br>Champions holding the Crest of Cinders empower their attacks to Burn their target for @BurnAmount*100@% of their max Health as true damage and apply 33% <TFTKeyword>Wound</TFTKeyword>.<br><br><tftitemrules>[Unique - only one per champion]</tftitemrules>",
      "effects": {
          "BurnAmount": 0.07999999821186066,
          "BurnDuration": 8,
          "Health": 250,
          "HexRange": 1,
          "MaxHPHeal": 2,
          "{ff22d532}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Crest_Of_Cinders.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crest Of Cinders",
      "unique": true
  },
  {
      "apiName": "TFT_Item_TearOfTheGoddess",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleMana% +@Mana@ Mana",
      "effects": {
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Tear_of_the_Goddess.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tear of the Goddess",
      "unique": false
  },
  {
      "apiName": "TFT_Item_FreeDeathblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "",
      "effects": {
          "AD": 30,
          "{55ce8055}": "null",
          "{d0fcc895}": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_DeathBlade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Deathblade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_CursedBlade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks reduce the target's max Health by @MaxHealthPercent@%. @HitCount@ attacks on the same target reduces their star level by 1.",
      "effects": {
          "AS": 35,
          "HitCount": 13,
          "MagicResist": 20,
          "MaxHealthPercent": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_CursedBlade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cursed Blade",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnZhonyasParadox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat at @PercentHealthThreshold@% Health, become invulnerable and untargetable for @InvulnDuration@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AP": 45,
          "Armor": 30,
          "InvulnDuration": 3,
          "MagicResist": 30,
          "PercentHealthThreshold": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Mage_T3_ZhonyasHourglass.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zhonya's Paradox",
      "unique": true
  },
  {
      "apiName": "TFT_Item_NegatronCloak",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleMR% +@MagicResist@ Magic Resist",
      "effects": {
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Negatron_Cloak.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Negatron Cloak",
      "unique": false
  },
  {
      "apiName": "TFT_Item_TitansResolve",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_RecurveBow"
      ],
      "desc": "Gain @StackingAD*100@% Attack Damage and @StackingSP@ Ability Power when attacking or taking damage, stacking up to @StackCap@ times.  <br><br>At full stacks, gain @BonusResistsAtStackCap@ Armor and @BonusResistsAtStackCap@ Magic Resist.",
      "effects": {
          "AS": 10,
          "Armor": 20,
          "BonusResistsAtStackCap": 20,
          "StackCap": 25,
          "StackingAD": 0.019999999552965164,
          "StackingSP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Titans_Resolve.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Titan's Resolve",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_PiltoverCharges",
      "associatedTraits": [],
      "composition": [],
      "desc": "Start with @TooltipStartingCharge@ Charge. Gain Charges each time you lose. The larger your loss streak, the more Charges you gain per loss. When you win, all Charges are converted to Power for the T-Hex.<br><br>Current loss streak: <TFTBonus>@TFTUnitProperty.item:TFT9_Piltover_Charges@</TFTBonus> <rules>(doubled in Hyper Roll)</rules><br>Charges granted next loss: <TFTBonus>+@TFTUnitProperty.item:TFT9_Piltover_ChargesToGrant@</TFTBonus><br>Current loot value on victory: <TFTBonus>@TFTUnitProperty.item:TFT9_Piltover_ProgressGoldValue@ gold</TFTBonus><br><br><tftitemrules>[This does not count as an item.]</tftitemrules>",
      "effects": {
          "TooltipStartingCharge": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set9_Inventor/TFT9_PiltoverCharges.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Charges",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SupportKnightsVow",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant @AllyHealth@ Health and @Omnivamp*100@% Omnivamp to the holder and allies within 1 hex in the same row.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "AllyHealth": 200,
          "Health": 50,
          "HexRange": 1,
          "Omnivamp": 0.15000000596046448,
          "Resists": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Knights_Vow.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knight's Vow",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_MasterworkUpgrade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a unit to open an armory containing Radiant versions of that unit's craftable completed items. Upgrade the item you choose to its Radiant equivalent, and unequip it.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/MasterworkUpgrade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Masterwork Upgrade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_LudensTempest",
      "associatedTraits": [],
      "composition": [],
      "desc": "@PercentOfOverkill@% of overkill damage plus @BaseDamage@ is dealt as magic damage to the three enemies nearest the target.",
      "effects": {
          "AD": 0.4000000059604645,
          "AP": 40,
          "BaseDamage": 100,
          "PercentOfOverkill": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_LudensTempest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Luden's Tempest",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_SpectralCutlass",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Teleport the holder to the mirrored hex on the enemy's side of the board. After @Duration@ seconds, the holder returns to their original location.",
      "effects": {
          "AD": 0.4000000059604645,
          "CritChance": 20,
          "Duration": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_SpectralCutlass.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spectral Cutlass",
      "unique": false
  },
  {
      "apiName": "TFT_Item_RunaansHurricane",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NegatronCloak",
          "TFT_Item_RecurveBow"
      ],
      "desc": "Attacks fire a bolt at a nearby enemy, dealing @MultiplierForDamage@% Attack Damage %i:scaleAD% as physical damage.",
      "effects": {
          "AD": 0.25,
          "AS": 10,
          "AdditionalTargets": 1,
          "MagicResist": 20,
          "MultiplierForDamage": 55
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Runaans_Hurricane.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Runaan's Hurricane",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugDamageAmp",
      "associatedTraits": [],
      "composition": [],
      "desc": "Cause this unit to deal  @TFTUnitProperty.:TFT_UnitProperty_Debug@% increased damage. Does not stack. Lasts until the unit is deconstructed.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/DU_Augment_BulkShipping.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Damage Amp",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_CrownOfDemacia_DU",
      "associatedTraits": [],
      "composition": [],
      "desc": "If the holder begins combat in the front 2 rows, regenerate @HealingPercentPerTickPerStage@-@HealingPercentPerTickPerStage*7@% maximum Health every @HealTickRate@ seconds (based on stage). If they start in the back 2 rows, gain @ADandAPPerTick@-@ADandAPPerTick*7@% %i:scaleAD% Attack Damage and %i:scaleAP% Ability Power every @HealTickRate@ seconds instead. <br><br>If the holder of this item dies, you instantly lose the fight.<br><br><tftitemrules>You can remove this item by benching the holder.</tftitemrules><br><br><tftitemrules>Double Up: This item no longer causes you to lose the fight that round if it's holder is part of a reinforcement.</tftitemrules><br>",
      "effects": {
          "ADandAPPerTick": 1,
          "AS": 40,
          "HealTickRate": 2,
          "HealingPercentPerTickPerStage": 2,
          "Health": 400
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_RegionItems/CrownOfDemacia.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crown of Demacia",
      "unique": true
  },
  {
      "apiName": "TFT_Item_IsYordle",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_IsYordle",
      "effects": {
          "CritChance": 20,
          "DodgeChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Mittens.tex",
      "id": null,
      "incompatibleTraits": [
          "Yordle"
      ],
      "name": "tft_item_name_Mittens",
      "unique": true
  },
  {
      "apiName": "TFT7_Item_TreasureDragonGold9",
      "associatedTraits": [],
      "composition": [],
      "desc": "9 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "9 gold",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_TreasureDragonBlankSlot",
      "associatedTraits": [],
      "composition": [],
      "desc": "",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TreasureDragon/Blank_Treasure_Frame.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_TreasureDragonGold4",
      "associatedTraits": [],
      "composition": [],
      "desc": "4 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "4 Gold",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_TreasureDragonGold3",
      "associatedTraits": [],
      "composition": [],
      "desc": "3 Gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "3 Gold",
      "unique": false
  },
  {
      "apiName": "TFT7_Item_TreasureDragonGold20",
      "associatedTraits": [],
      "composition": [],
      "desc": "20 gold",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/AssistGiveGold.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "20 gold",
      "unique": false
  },
  {
      "apiName": "TFT_Item_FreeBFSword",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAD% +@AD*100@% Attack Damage",
      "effects": {
          "AD": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Icon_BFSword.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "B.F. Sword",
      "unique": false
  },
  {
      "apiName": "TFT_Item_SparringGloves",
      "associatedTraits": [],
      "composition": [],
      "desc": "+@CritChance@ Critical Strike Chance",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Sparring_Gloves.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sparring Gloves",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_RapidFirecannon",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain +1 Attack Range, increased by 1 whenever the holder kills an enemy.",
      "effects": {
          "AS": 75
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_RapidFirecannon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rapid Firecannon",
      "unique": false
  },
  {
      "apiName": "TFT9_Consumable_GoldenItemRemover",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to unequip all items as many times as you want. Converts all future Magnetic Removers to Reforgers. ",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ItemRemover.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Item Remover",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Bloodthirster",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "Once per combat at @HealthThreshold@% Health, gain a @ShieldHealthPercent@% max Health Shield that lasts up to @ShieldDuration@ seconds.",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "HealthThreshold": 40,
          "LifeSteal": 20,
          "MagicResist": 20,
          "ShieldDuration": 5,
          "ShieldHealthPercent": 25,
          "StatOmnivamp": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Bloodthirster.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Bloodthirster",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_OrnnHorizonFocus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain %i:scaleRange% @HexRangeIncrease@ Attack Range. Gain @DamageAmpPerHex*100@% Damage Amp against a target for each hex between the holder and the target.",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "AS": 15,
          "DamageAmpPerHex": 0.09000000357627869,
          "HexRangeIncrease": 1,
          "PercentDamageIncrease": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_SnipersFocus.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sniper's Focus",
      "unique": false
  },
  {
      "apiName": "TFT_Item_UnstableTreasureChest",
      "associatedTraits": [],
      "composition": [],
      "desc": "When the holder dies, the @ItemsGranted@ closest allies gain a temporary completed item.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "Health": 150,
          "ItemsGranted": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Unstable_Treasure_Chest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unstable Treasure Chest",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ArchangelsStaff",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "Combat start: Gain @APPerInterval@ Ability Power every @IntervalSeconds@ seconds in combat.",
      "effects": {
          "AP": 20,
          "APPerInterval": 30,
          "IntervalSeconds": 5,
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Archangel_Staff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Archangel's Staff",
      "unique": false
  },
  {
      "apiName": "TFTEvent_SF_Item_PowerUp_Rank4",
      "associatedTraits": [],
      "composition": [],
      "desc": "Prevents the holder's first death. When they revive after 2 seconds, they shed all negative effects and gain <active>@TFTUnitProperty.item:TFT_Event_SF_SoulCrownHealthRestore@</active> Health (double your Soul Power).<br><br>Contribute +1 to the last listed Trait. (Unique traits excluded.)<br><br><tftitemrules> [Cannot be used on champions in combat.]</tftitemrules><br><tftitemrules> [Unlimited uses.]</tftitemrules>",
      "effects": {
          "BonusAttackDamage": 0.4000000059604645,
          "BonusPercentHealth": 0.5,
          "{32f90193}": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Events/SF/TFT_Event_SF_SoulCrown_Tournament.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Soul Crown",
      "unique": false
  },
  {
      "apiName": "TFTEvent_SF_Item_PowerUp_Rank1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Contribute +1 to the last listed Trait. (Unique traits excluded.)<br><br><tftitemrules>A new effect unlocks at the start of the tournament (4-1).</tftitemrules><br><br><tftitemrules> [Cannot be used on champions in combat.]</tftitemrules><br><tftitemrules> [Unlimited uses.]</tftitemrules>",
      "effects": {
          "BonusAttackDamage": 0.20000000298023224,
          "BonusPercentHealth": 0.30000001192092896,
          "{32f90193}": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Events/SF/TFT_Event_SF_SoulCrown_Training_1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Imperfect Soul Crown",
      "unique": false
  },
  {
      "apiName": "TFT_Item_KnightsVow",
      "associatedTraits": [],
      "composition": [],
      "desc": "Extra %i:scaleArmor% +@Armor@<br>Holder is also a Knight<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "Armor": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_KnightsVow.tex",
      "id": null,
      "incompatibleTraits": [
          "Knight"
      ],
      "name": "Knight's Vow",
      "unique": true
  },
  {
      "apiName": "TFT_Item_FrozenMallet",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_FrozenMallet",
      "effects": {
          "Health": 400
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_FrozenMallet.tex",
      "id": null,
      "incompatibleTraits": [
          "Glacial"
      ],
      "name": "TFT_item_name_FrozenMallet",
      "unique": true
  },
  {
      "apiName": "TFT_Item_DebugTaunt",
      "associatedTraits": [],
      "composition": [],
      "desc": "Taunt all enemies who are in range to attack the target.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/DU_Augment_Copycat.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Taunt",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_ChampionDuplicator_III",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a 3-cost champion or less to create a 1-star copy on your bench.<br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/ChampionDuplicator_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lesser Champion Duplicator",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugMana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grant @TFTUnitProperty.:TFT_UnitProperty_Debug@ Mana.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/DU_Augment_SolarPower.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Tears of My Enemies",
      "unique": false
  },
  {
      "apiName": "TFT10_Consumable_EDM_Selector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use this on an EDM champion to select them. The selected champion determines the frequency of EDM casts.<br><br>Jax: Every <scaleLevel>@TFTUnitProperty.trait:TFT10_Trait_EDM_JaxFrequency@</scaleLevel> seconds.<br>Lux: Every <scaleLevel>@TFTUnitProperty.trait:TFT10_Trait_EDM_LuxFrequency@</scaleLevel> seconds.<br>Zac: Every <scaleLevel>@TFTUnitProperty.trait:TFT10_Trait_EDM_ZacFrequency@</scaleLevel> seconds.<br>Zed: Every <scaleLevel>@TFTUnitProperty.trait:TFT10_Trait_EDM_ZedFrequency@</scaleLevel> seconds.<br><br>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set10_EDM/EDM_Selector.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "EDM Selector",
      "unique": false
  },
  {
      "apiName": "TFT_Item_TitanicHydra",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: <TFTKeyword>Taunt</TFTKeyword>.<br>On death, a Voidspawn arises, <TFTKeyword>Taunting</TFTKeyword> nearby enemies. The Voidspawn has massively reduced effectiveness when created by a summoned unit.<br><br><tftitemrules><tftbold>Taunt</tftbold>: enemies that are able and in range must attack the taunter</tftitemrules>",
      "effects": {
          "AS": 10,
          "Health": 150,
          "SummonedStatReduction": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/ZZRot_Portal.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Zz'Rot Portal",
      "unique": false
  },
  {
      "apiName": "TFT_Item_HextechChestguard",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_HextechChestguard",
          "TFT_Item_HextechChestguard"
      ],
      "desc": "tft_item_description_HextechChestguard",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_HextechChestguard.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_HextechChestguard",
      "unique": false
  },
  {
      "apiName": "TFT11_Fortune_Cashout",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cash Out",
      "unique": false
  },
  {
      "apiName": "TFT11_Fortune_PushYourLuck",
      "associatedTraits": [],
      "composition": [],
      "desc": null,
      "effects": {
          "BonusHearts": 100,
          "WinPenalty": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Push your luck",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_CrownOfDemacia",
      "associatedTraits": [],
      "composition": [],
      "desc": "If the holder begins combat in the front 2 rows, regenerate @HealingPercentPerTickPerStage@-@HealingPercentPerTickPerStage*7@% maximum Health every @HealTickRate@ seconds (based on stage). If they start in the back 2 rows, gain @ADandAPPerTick@-@ADandAPPerTick*7@% %i:scaleAD% Attack Damage and %i:scaleAP% Ability Power every @HealTickRate@ seconds instead. <br><br>If the holder of this item dies, you instantly lose the fight.<br><br><tftitemrules>You can remove this item by benching the holder.</tftitemrules><br><br>",
      "effects": {
          "ADandAPPerTick": 1,
          "AS": 40,
          "HealTickRate": 2,
          "HealingPercentPerTickPerStage": 2,
          "Health": 400
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_RegionItems/CrownOfDemacia.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crown of Demacia",
      "unique": true
  },
  {
      "apiName": "TFT_Item_EternalFlame",
      "associatedTraits": [],
      "composition": [],
      "desc": "While the holder is alive, all enemies are @TOOLTIPWoundAmount@% <TFTKeyword>Wounded</TFTKeyword> and all allies gain @DamageAmp*100@% Damage Amp. This effect refreshes every @WoundDuration@ seconds.<br><br><tftitemrules>​​[Support item]<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "BonusDamage": 0.07999999821186066,
          "DamageAmp": 0.07999999821186066,
          "Health": 150,
          "TOOLTIPWoundAmount": 33,
          "WoundDuration": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Eternal_Flame.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Eternal Flame",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_LightshieldCrest",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @TriggerRate@ seconds, Shields the lowest percent Health ally for @PercentOfResists@% of the holder's combined Armor and Magic Resist.<br><br>On death grants this shield to all allies.",
      "effects": {
          "Armor": 50,
          "MagicResist": 50,
          "PercentOfResists": 50,
          "TriggerRate": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_LightshieldCrest.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lightshield Crest",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnDeathsDefiance",
      "associatedTraits": [],
      "composition": [],
      "desc": "@IgnorePainPercent@% of the damage the holder receives is instead dealt over @BleedDuration@ seconds as non-lethal damage.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.10000000149011612,
          "AS": 25,
          "Armor": 30,
          "BaseHeal": 25,
          "BleedDuration": 4,
          "IgnorePainPercent": 50,
          "StatOmnivamp": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Fighter_T3_DeathsDance.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Death's Defiance",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Darkin",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_Darkin",
      "effects": {
          "Mana": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Darkin.tex",
      "id": null,
      "incompatibleTraits": [
          "Demon"
      ],
      "name": "tft_item_name_Darkin",
      "unique": true
  },
  {
      "apiName": "TFT_Item_SpearOfShojin",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "Attacks grant @FlatManaRestore@ bonus Mana.",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "FlatManaRestore": 5,
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Spear_of_Shojin.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spear of Shojin",
      "unique": false
  },
  {
      "apiName": "TFT_Item_YoumuusGhostblade",
      "associatedTraits": [],
      "composition": [],
      "desc": "The holder is also an Assassin.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_YoumuusGhostblade.tex",
      "id": null,
      "incompatibleTraits": [
          "Assassin"
      ],
      "name": "Youmuu's Ghostblade",
      "unique": true
  },
  {
      "apiName": "TFT_Item_SpectralGauntlet",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NegatronCloak",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "@ARReductionAmount@% <TFTKeyword>Sunder</TFTKeyword> enemies within @HexRange@ hexes. Gain @BonusResists@ Armor and Magic Resist for the first @BonusResistDuration@ seconds of combat.<br><br><tftitemrules><tftbold>Sunder</tftbold>: Reduce Armor</tftitemrules>",
      "effects": {
          "ARReductionAmount": 30,
          "BonusResistDuration": 10,
          "BonusResists": 25,
          "Health": 150,
          "HexRange": 2,
          "MagicResist": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Evenshroud.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Evenshroud",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Spatula",
      "associatedTraits": [],
      "composition": [],
      "desc": "<tftitemrules>It must do something...</tftitemrules>",
      "effects": {
          "{fe9818ef}": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Spatula.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spatula",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_OrnnPrototypeForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round: Equip 2 random Ornn Artifacts.<br><br><tftitemrules>[Consumes 3 item slots.]</tftitemrules>",
      "effects": {
          "CritChance": 30,
          "Health": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_BlacksmithsGloves.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blacksmith's Gloves",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_BlightingJewel",
      "associatedTraits": [],
      "composition": [],
      "desc": "Dealing magic damage reduces the target's Magic Resist by @MRReduction@. If their Magic Resist is 0, grant the holder @ManaGain@ Mana instead.",
      "effects": {
          "AP": 40,
          "MRReduction": 4,
          "ManaGain": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_BlightingJewel.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blighting Jewel",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_TalismanOfAscension",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Seconds@ seconds gain @MaxHealthPercent@% max Health and @DamageAmp*100@% Damage Amp for the rest of combat.",
      "effects": {
          "AD": 0.20000000298023224,
          "AP": 20,
          "DamageAmp": 1.2000000476837158,
          "DamageIncreasePercent": 120,
          "Health": 300,
          "MaxHealthPercent": 100,
          "Seconds": 22
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_TalismanOfAscension.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Talisman Of Ascension",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnInfinityForce",
      "associatedTraits": [],
      "composition": [],
      "desc": "<tftitemrules>Tons of EVERYTHING!</tftitemrules>",
      "effects": {
          "AD": 0.25,
          "AP": 25,
          "AS": 25,
          "Armor": 25,
          "Health": 250,
          "MagicResist": 25,
          "Mana": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Fighter_T4_TrinityForce.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Infinity Force",
      "unique": false
  },
  {
      "apiName": "TFT_Item_LocketOfTheIronSolari",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: The holder and allies within @HexRange@ hexes in the same row gain a @ShieldValue@ Shield, @BonusResists@ Armor, and @BonusResists@ Magic Resist for @ShieldDuration@ seconds.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BonusResists": 20,
          "Health": 150,
          "HexRange": 2,
          "ShieldDuration": 20,
          "ShieldValue": 250
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Locket_of_the_Iron_Solari.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Locket of the Iron Solari",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Leviathan",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "After casting an Ability, gain @AttackSpeedToGive@% Attack Speed for @ASDuration@ seconds.",
      "effects": {
          "AP": 10,
          "AS": 10,
          "ASDuration": 5,
          "AttackSpeedToGive": 60,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Nashors_Tooth.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Nashor's Tooth",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Yuumi",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_Yuumi",
      "effects": {
          "AP": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Yuumi.tex",
      "id": null,
      "incompatibleTraits": [
          "Sorcerer"
      ],
      "name": "TFT_item_name_Yuumi",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Artifact_SuspiciousTrenchCoat",
      "associatedTraits": [],
      "composition": [],
      "desc": "Once per combat at @PercentHealthTrigger@% Health, the holder splits into 3 copies of themself each with @PercentHealthOfCopies@% of their max Health.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AS": 25,
          "Health": 100,
          "PercentHealthOfCopies": 33,
          "PercentHealthTrigger": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_SuspiciousTrenchCoat.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Suspicious Trench Coat",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Morellonomicon",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "Attacks and Abilities deal @BurnPercent@% <TFTKeyword>Burn</TFTKeyword> and @GrievousWoundsPercent@% <TFTKeyword>Wound</TFTKeyword> to enemies for @BurnDuration@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "AP": 25,
          "AS": 10,
          "BurnDuration": 10,
          "BurnPercent": 1,
          "GrievousWoundsPercent": 33,
          "Health": 150,
          "MonsterCap": 100,
          "TicksPerSecond": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Morellonomicon.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Morellonomicon",
      "unique": true
  },
  {
      "apiName": "TFT_Item_RapidFireCannon",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_RecurveBow"
      ],
      "desc": "Attacks and Abilities @BurnPercent@% <TFTKeyword>Burn</TFTKeyword> and @HealingReductionPct@% <TFTKeyword>Wound</TFTKeyword> enemies for @Duration@ seconds.<br><br><tftitemrules><tftbold>Burn</tftbold>: Deals a percent of the target's max Health as true damage every second<br><tftbold>Wound</tftbold>: Reduces healing received</tftitemrules>",
      "effects": {
          "AS": 35,
          "BonusDamage": 0.05999999865889549,
          "BurnPercent": 1,
          "Duration": 5,
          "HealingReductionPct": 33,
          "HexRangeIncrease": 1,
          "{1543aa48}": 0.05999999865889549,
          "{9f5117db}": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/RedBuff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Red Buff",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_TrainingDummy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to spawn a movable target dummy nearby. <br><br><tftitemrules> [Cannot be used in combat. <br>Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_Dummy.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Target Dummy",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Crownguard",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_ChainVest"
      ],
      "desc": "Combat start: Gain a @ShieldSize@% max Health Shield for @ShieldDuration@ seconds.<br>When the shield expires, gain @ShieldBonusAP@ Ability Power.<br>",
      "effects": {
          "AP": 20,
          "Armor": 20,
          "ChillDuration": 4,
          "Health": 100,
          "HexRange": 2,
          "ShieldBonusAP": 35,
          "ShieldDuration": 8,
          "ShieldSize": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Crownguard.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crownguard",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BFSword",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAD% +@AD*100@% Attack Damage",
      "effects": {
          "AD": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/BF_Sword.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "B.F. Sword",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_Mittens",
      "associatedTraits": [],
      "composition": [],
      "desc": "Shrinks the holder, granting them increased movement speed and immunity to <TFTKeyword>Chill</TFTKeyword>.<br><br><tftitemrules><tftbold>Chill</tftbold>: reduce Attack Speed</tftitemrules>",
      "effects": {
          "AS": 60,
          "PercentDR": 20,
          "{cd951938}": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_Mittens.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mittens",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_PiltoverProgress",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain Power by winning combats after gaining Charges. More Power gives more stats.<br><br><tftitemrules>[This does not count as an item.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set9_Inventor/TFT9_PiltoverPower.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Power",
      "unique": false
  },
  {
      "apiName": "TFT_Item_AdaptiveHelm",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NegatronCloak",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "Combat start: Gain different bonuses based on starting position.<br><br>Front Two Rows: @FrontRowBonusResists@ Armor and Magic Resist. Gain @FrontLineManaPerHit@ Mana when struck by an attack.<br><br>Back Two Rows: @BackRowBonusAP@ Ability Power. Gain @ManaPerTickrate@ Mana every @ManaTickrate@ seconds.<br>",
      "effects": {
          "AP": 10,
          "BackRowBonusAP": 15,
          "FrontLineManaPerHit": 1,
          "FrontRowBonusResists": 40,
          "MagicResist": 20,
          "Mana": 15,
          "ManaPerTickrate": 10,
          "ManaTickrate": 3,
          "{d357c9f2}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Adaptive_Helm.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Adaptive Helm",
      "unique": false
  },
  {
      "apiName": "TFT_Consumable_ShopReroller",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a champion to reroll a special Shop that contains only champions sharing a Trait with the source champion. <br><br><tftitemrules>[Consumable - This item disappears when used.]</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Consumables/TFT_Item_Consumable_ShopReroll.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Loaded Dice",
      "unique": false
  },
  {
      "apiName": "TFT9_Item_OrnnDeathfireGrasp",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Blast the current target for @PercentMaxHealthDamage*100@% of their max Health as magic damage.<br><br>For the next @Duration@ seconds, gain @BaseDamageAmp*100@% Damage Amp. Against the blasted target this is increased to @TargetDamageAmp*100@%.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AP": 50,
          "BaseAmp": 0.25,
          "BaseDamageAmp": 0.25,
          "BonusAmp": 0.3499999940395355,
          "Duration": 10,
          "Mana": 15,
          "PercentMaxHealthDamage": 0.20000000298023224,
          "TargetDamageAmp": 0.3499999940395355
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_DeathfireGrasp.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Deathfire Grasp",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Spite",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: The holder and all adjacent allies gain @ADIncrease*100@ Attack Damage and @APIncrease@ Ability Power.<br><br>When the holder dies, Stun all enemies within 2-hexes for @Duration@ seconds.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "ADIncrease": 0.15000000596046448,
          "APIncrease": 20,
          "Duration": 2,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Spite.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spite",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ZhonyasHourglass",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_ZhonyasHourglass",
      "effects": {
          "AP": 20,
          "Armor": 25,
          "HealthPercent": 30,
          "StasisDuration": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_ZhonyasHourglass.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "TFT_item_name_ZhonyasHourglass",
      "unique": false
  },
  {
      "apiName": "TFT_Item_BlueBuff",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_TearOfTheGoddess",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "Max mana reduced by @ManaReduction@. <br><br>When the holder gets a takedown, they deal @DamageAmp*100@% more damage for @TakedownTimer@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "DamageAmp": 0.07999999821186066,
          "Mana": 20,
          "ManaReduction": 10,
          "TakedownTimer": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Blue_Buff.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Buff",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Artifact_CursedVampiricScepter",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks deal an additional @PercentDamage@% Attack Damage %i:scaleAD% as physical damage and heal the holder for the damage dealt.<br><br><TFTShadowItemBonus>The holder cannot cast their Ability or gain Mana.</TFTShadowItemBonus><br>",
      "effects": {
          "AS": 60,
          "PercentDamage": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_CursedVampiricScepter.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Corrupt Vampiric Scepter",
      "unique": false
  },
  {
      "apiName": "TFT_Item_LastWhisper",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Physical damage @ArmorReductionPercent@% <TFTKeyword>Sunders</TFTKeyword> the target for @ArmorBreakDuration@ seconds. This effect does not stack.<br><br><tftitemrules>[Unique - only 1 per champion]<br><tftbold>Sunder</tftbold>: Reduce Armor</tftitemrules>",
      "effects": {
          "AD": 0.15000000596046448,
          "AS": 20,
          "ArmorBreakDuration": 3,
          "ArmorReductionPercent": 30,
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Last_Whisper.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Last Whisper",
      "unique": true
  },
  {
      "apiName": "TFT_Item_JeweledGauntlet",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_NeedlesslyLargeRod",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Abilities can critically strike.<br><br>If the holder's abilities can already critically strike, gain @CritDamageToGive*100@% Critical Strike Damage instead.",
      "effects": {
          "AP": 35,
          "CritChance": 35,
          "CritDamageToGive": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Jeweled_Guantlet.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Gauntlet",
      "unique": false
  },
  {
      "apiName": "TFT_Item_GiantsBelt",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleHealth% +@Health@ Health",
      "effects": {
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Gaints_Belt.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant's Belt",
      "unique": false
  },
  {
      "apiName": "TFT_Item_DebugUnitID",
      "associatedTraits": [],
      "composition": [],
      "desc": "Print the UnitID to chat.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Augments/TFT6_Augment_ExperimentalEmblem.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Do You Know Who I Am?",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Unknown",
      "associatedTraits": [],
      "composition": [],
      "desc": "<tftitemrules>It must do something...</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Placeholders/TFT_Item_Unknown.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spatula",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_WitsEnd",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks deal @TFTUnitProperty.item:TFT_Item_Artifact_WitsEnd_Damage@ bonus magic damage.<br><br>Heals the holder for @PercentHealing@% of all magic damage dealt.<br><br><tftitemrules>Damage increases based on Stage.</tftitemrules>",
      "effects": {
          "AS": 30,
          "MagicResist": 30,
          "PercentHealing": 35,
          "{54f90860}": 90,
          "{55f909f3}": 75,
          "{56f90b86}": 100,
          "{57f90d19}": 100,
          "{58f90eac}": 42,
          "{5af911d2}": 60,
          "{5bf91365}": 42,
          "{61f91cd7}": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_WitsEnd.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wit's End",
      "unique": false
  },
  {
      "apiName": "TFT_Item_JammedSlot",
      "associatedTraits": [],
      "composition": [],
      "desc": "Item temporarily disabled",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Jammed.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jammed!",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ThiefsGloves_Empty",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_FracturedMirrorEmptySlot",
      "effects": {
          "CritChance": 20,
          "DodgeChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Placeholders/TFT_Item_EmptySlot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "",
      "unique": false
  },
  {
      "apiName": "TFT_Item_NeedlesslyLargeRod",
      "associatedTraits": [],
      "composition": [],
      "desc": "%i:scaleAP% +@AP@ Ability Power",
      "effects": {
          "AP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Needlessly_Large_Rod.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Needlessly Large Rod",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_HorizonFocus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Stunning an enemy causes lightning to strike them, dealing @PercentHealthDamage@% of their max Health as magic damage.<br>",
      "effects": {
          "Armor": 20,
          "Health": 250,
          "MagicResist": 20,
          "Mana": 15,
          "PercentHealthDamage": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_HorizonFocus.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Horizon Focus",
      "unique": false
  },
  {
      "apiName": "TFT_Item_MortalReminder",
      "associatedTraits": [],
      "composition": [],
      "desc": "TFT_item_description_MortalReminder",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_MortalReminder.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "game_item_displayname_3033",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnRanduinsSanctum",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant %i:scaleArmor% @BonusDefense@ Armor and %i:scaleMR% @BonusDefense@ Magic Resistance to the holder and adjacent allies.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BonusDefense": 30,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Randuins_Sanctum_Support.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Randuin's Omen",
      "unique": false
  },
  {
      "apiName": "TFT_Item_NightHarvester",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_ChainVest",
          "TFT_Item_SparringGloves"
      ],
      "desc": "Gain @BaseDurability*100@% Durability. While above @ThresholdForEmpower*100@% Health, instead gain @EmpoweredDurability*100@% Durability.",
      "effects": {
          "Armor": 20,
          "BaseDamageReduction": 8,
          "BaseDurability": 0.07999999821186066,
          "CritChance": 20,
          "EmpowerDamageReduction": 15,
          "EmpoweredDurability": 0.15000000596046448,
          "Health": 200,
          "ThresholdForEmpower": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Behemoth.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Steadfast Heart",
      "unique": false
  },
  {
      "apiName": "TFT_Item_FreeVengeance",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_SwordOfTheDivine2",
      "effects": {
          "AS": 15,
          "AttackSpeedPerStack": 30,
          "CritChance": 20,
          "{cb57edb0}": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_RepeatingCrossbow.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_SwordOfTheDivine2",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Artifact_ProwlersClaw",
      "associatedTraits": [],
      "composition": [],
      "desc": "After killing a target, shed negative effects and dash to the farthest target within @HexRange@ hexes. The next 2 critical attacks deal @CritDamageBonusPercent@% bonus Critical Strike Damage.",
      "effects": {
          "AD": 0.5,
          "CritChance": 50,
          "CritDamageBonusPercent": 60,
          "HexRange": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_ProwlersClaw.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Prowler's Claw",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Moonstone",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @ShieldRate@ seconds, grant a @BaseShieldAmount@-@MaxShield@ Shield (based on Stage) to the @ShieldTargets@ lowest percent health allies for @ShieldDuration@ seconds.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BaseShieldAmount": 60,
          "Health": 150,
          "MaxShield": 360,
          "ShieldDuration": 4,
          "ShieldRate": 4,
          "ShieldTargets": 2,
          "{f4f7ff53}": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Moonstone.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Moonstone Renewer",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Vengeance",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_SwordOfTheDivine2",
      "effects": {
          "AS": 15,
          "AttackSpeedPerStack": 30,
          "CritChance": 20,
          "{cb57edb0}": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_RepeatingCrossbow.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_SwordOfTheDivine2",
      "unique": true
  },
  {
      "apiName": "TFT_Item_FryingPan",
      "associatedTraits": [],
      "composition": [],
      "desc": "<tftitemrules>...why else would it be here?</tftitemrules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Frying_Pan.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frying Pan",
      "unique": false
  },
  {
      "apiName": "TFT9_Consumable_MasterworkUpgrade",
      "associatedTraits": [],
      "composition": [],
      "desc": "Use on a unit to open an armory containing Radiant versions of that unit's craftable completed items. Upgrade the item you choose to its Radiant equivalent, and unequip it.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_RegionItems/MasterworkUpgrade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Masterwork Upgrade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_ForceOfNature",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_Spatula",
          "TFT_Item_Spatula"
      ],
      "desc": "Your team gains +@MaxArmySizeIncrease@ max team size.<br><br>@PercentGoldChance@% chance to drop 1 gold when you win combat.<br><br><tftitemrules>\"...the Heart of a hero...\"</tftitemrules>",
      "effects": {
          "MaxArmySizeIncrease": 1,
          "PercentGoldChance": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Tacticians_Crown.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tactician's Crown",
      "unique": false
  },
  {
      "apiName": "TFT_Item_AegisOfTheLegion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant @ASBuff@% Attack Speed and @BonusResists@ Armor and Magic Resist to the holder, adjacent allies in the same row, and all allies behind them for @BuffDuration@ seconds.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "ASBuff": 25,
          "BonusResists": 15,
          "BuffDuration": 12,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Aegis.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Aegis of the Legion",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Quicksilver",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_SparringGloves",
          "TFT_Item_NegatronCloak"
      ],
      "desc": "Combat start: Gain immunity to crowd control for @SpellShieldDuration@ seconds. During this time, gain @ProcAttackSpeed*100@% Attack Speed every @ProcInterval@ seconds.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AS": 30,
          "CritChance": 20,
          "MagicResist": 20,
          "ProcAttackSpeed": 0.03999999910593033,
          "ProcInterval": 2,
          "SpellShieldDuration": 14
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Quicksilver.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Quicksilver",
      "unique": true
  },
  {
      "apiName": "TFT_Item_Deathblade",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_BFSword"
      ],
      "desc": "",
      "effects": {
          "AD": 0.5,
          "BonusDamage": 0.07999999821186066,
          "{1543aa48}": 0.07999999821186066
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Death_Blade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Deathblade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Chalice",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Grant @ChaliceAP@ Ability Power and @BonusInitialMana@ Mana to the holder and allies within 2 hexes in the same row.<br><br>​​<tftitemrules>[Support item]</tftitemrules>",
      "effects": {
          "BonusInitialMana": 10,
          "ChaliceAP": 25,
          "Health": 150,
          "HexRange": 2,
          "{9fd37c1c}": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT9_SupportItems/Chalice_of_Power.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Chalice of Power",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_SilvermereDawn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Grants immunity to Stuns and the holder's attacks Stun the target for @StunDuration@ seconds.<br><br><TFTShadowItemBonus>The holder's Attack Speed is locked at @AttackSpeedCap@.</TFTShadowItemBonus>",
      "effects": {
          "AD": 1.649999976158142,
          "Armor": 50,
          "AttackSpeedCap": 0.5,
          "MagicResist": 50,
          "StunDuration": 0.800000011920929
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_SilvermereDawn.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silvermere Dawn",
      "unique": false
  },
  {
      "apiName": "TFT_Item_TacticiansScepter",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_FryingPan",
          "TFT_Item_FryingPan"
      ],
      "desc": "Your team gains +@MaxArmySizeIncrease@ max team size.<br><br>@PercentGoldChance@% chance to drop 1 gold when the holder dies.<br><br><tftitemrules>\"Imbued with a Philosopher's wisdom...\"</tftitemrules>",
      "effects": {
          "MaxArmySizeIncrease": 1,
          "PercentGoldChance": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Tacticians_Scepter.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tactician's Shield",
      "unique": false
  },
  {
      "apiName": "TFT11_Item_ThiefsGlovesSupport",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round: Equip 2 random Support items.<br><br><tftitemrules>[Consumes 3 item slots.]</tftitemrules>",
      "effects": {
          "CritChance": 20,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Thieves_Gloves.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Accomplice's Gloves",
      "unique": false
  },
  {
      "apiName": "TFT_Item_WarmogsArmor",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_GiantsBelt",
          "TFT_Item_GiantsBelt"
      ],
      "desc": "Gain @BonusPercentHP*100@% max health.",
      "effects": {
          "BonusPercentHP": 0.11999999731779099,
          "Health": 600
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Warmogs_Armor.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Warmog's Armor",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Artifact_SeekersArmguard",
      "associatedTraits": [],
      "composition": [],
      "desc": "Takedowns increase the holder's Armor, Magic Resist, and Ability Power by @StatsPerTakedown@, increased to @StatsPerKill@ if they score the kill.",
      "effects": {
          "AP": 30,
          "Armor": 30,
          "MagicResist": 30,
          "StatsPerKill": 15,
          "StatsPerTakedown": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_SeekersArmguard.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Seeker's Armguard",
      "unique": false
  },
  {
      "apiName": "TFT_Item_StatikkShiv",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_RecurveBow",
          "TFT_Item_TearOfTheGoddess"
      ],
      "desc": "Every 3rd attack deals @Damage@ magic damage and @MRShred@% <TFTKeyword>Shreds</TFTKeyword> @1StarBounces@ enemies for @MRShredDuration@ seconds.<br><br><tftitemrules><tftbold>Shred</tftbold>: Reduce Magic Resist</tftitemrules>",
      "effects": {
          "1StarBounces": 4,
          "AP": 15,
          "AS": 15,
          "Damage": 35,
          "MRShred": 30,
          "MRShredDuration": 5,
          "Mana": 15,
          "{12a15e9e}": 4,
          "{15144cec}": 4,
          "{79e2ec7b}": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Statikk_Shiv.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Statikk Shiv",
      "unique": false
  },
  {
      "apiName": "TFT4_Item_OrnnTheCollector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Attacks and Abilities execute enemies below @ExecutePercent@% of their maximum Health. Executions have a @GoldChance@% chance to drop %i:goldCoins% 1 gold.<br><br><tftitemrules>[Unique - only 1 per champion]</tftitemrules>",
      "effects": {
          "AD": 0.30000001192092896,
          "CritChance": 30,
          "ExecutePercent": 12,
          "GoldChance": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_Marksman_T3_TheCollector.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gold Collector",
      "unique": true
  },
  {
      "apiName": "TFT_Item_UnusableSlot",
      "associatedTraits": [],
      "composition": [],
      "desc": "This slot can't hold an item.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Placeholders/TFT_Item_UnusableSlot.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unusable Slot",
      "unique": false
  },
  {
      "apiName": "TFT_Item_HextechGunblade",
      "associatedTraits": [],
      "composition": [
          "TFT_Item_BFSword",
          "TFT_Item_NeedlesslyLargeRod"
      ],
      "desc": "Heal the lowest percent Health ally for @AllyHealing*100@% of damage dealt.<br><br><TFTTrackerLabel>Ally Healing:</TFTTrackerLabel> <TFTHighlight>@TFTUnitProperty.item:TFT_Tracker_Value1@</TFTHighlight>",
      "effects": {
          "AD": 0.15000000596046448,
          "AP": 15,
          "AllyHealing": 0.20000000298023224,
          "Omnivamp": 20,
          "StatOmnivamp": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/Hextech_Gunblade.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hextech Gunblade",
      "unique": false
  },
  {
      "apiName": "TFT_Item_Hex_Mountain",
      "associatedTraits": [],
      "composition": [],
      "desc": "tft_item_description_MountainHexBuff",
      "effects": {
          "{1bb18b94}": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Hex_Mountain.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "tft_item_name_MountainHexBuff",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TheGoldenEgg",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a golden egg that hatches in @EggTurns@ turns for a huge amount of loot. Winning player combat speeds up the hatch timer by an extra turn.",
      "effects": {
          "EggTurns": 11,
          "{ecb4463d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/The-Golden-Egg-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Golden Egg",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TheGoldenEggHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a golden egg that hatches in @EggTurns@ turns for a huge amount of loot. Winning player combat speeds up the hatch timer by an extra turn.",
      "effects": {
          "EggTurns": 6,
          "{ecb4463d}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/The-Golden-Egg-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Golden Egg",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LivingForgeHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil now and after every @NumberOfCombats@ player combats.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Living-Forge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Living Forge",
      "unique": false
  },
  {
      "apiName": "TFT8_Augment_SalvageBinPlusHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 1 random completed item now, and 1 component after @NumRounds@ player combats. Selling champions breaks completed items into components (excluding Tactician's items).",
      "effects": {
          "NumRounds": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Salvage2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Salvage Bin+",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SalvageBinHR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 1 random completed item now, and 1 component after @NumRounds@ player combats. Selling champions breaks completed items into components (excluding Tactician's items).",
      "effects": {
          "NumRounds": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Salvage2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Salvage Bin",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_WhatTheForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Completed items you own (except Tactician's Crown and Emblems) are transformed into random Artifacts. Champions gain @Health@ Health per equipped Artifact. Gain @NumAnvil@ Artifact Anvil.",
      "effects": {
          "Health": 220,
          "{ad9f261f}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/What-The-Forge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "What the Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Dedication",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you field at least @NumUnits@ distinct units of the same trait in player combat, gain an Emblem for that trait.",
      "effects": {
          "NumUnits": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dedication-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dedication",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ThreesACrowd",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @HealthPerUnit@ Health for each unique @Tier@-cost champion on your board.",
      "effects": {
          "HealthPerUnit": 75,
          "Tier": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Three_s-a-Crowd-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Three's a Crowd",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MoneyHealsAllWounds",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: Gain @GoldPerTurn@ gold. If you have at least @GoldThreshhold@ gold, heal @Health@ player health.",
      "effects": {
          "GoldPerTurn": 3,
          "GoldThreshhold": 40,
          "Health": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Money-Heals-all-Wounds-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wellness Trust",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TinyTitans",
      "associatedTraits": [],
      "composition": [],
      "desc": "Increase your current and max player health by @heal@.",
      "effects": {
          "Heal": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiny-Titans-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Titans",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Common_EverythingMustGo",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions buy and sell for @cost@ gold. Gain @gold@ gold.",
      "effects": {
          "Cost": "null",
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/EverythingMustGo_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Everything Must Go!",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_RichGetRicher",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 12,
          "InterestCap": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rich Get Richer",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_MarksmansToolbox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Sniper's Focus. in @combatnum@ rounds, gain a Fishbones.",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MarksmansToolbox_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Marksman's Toolbox",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CuttingCorners",
      "associatedTraits": [],
      "composition": [],
      "desc": "Leveling up costs @Experience@ XP less.",
      "effects": {
          "Experience": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cutting-Corners-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cutting Corners",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ArmyBuilding",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Lesser Champion Duplicator. Gain another after @PlayerCombatNum@ player combats.<br><br><rules>This item allows you to copy a 3-cost or less champion.</rules>",
      "effects": {
          "PlayerCombatNum": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Building-an-army-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Team Building",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TiniestTitan",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Heal@ player health and @Gold@ gold after every player combat. Your Tactician also moves faster.",
      "effects": {
          "Gold": 2,
          "Heal": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiniest-TitanIII.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiniest Titan",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_YoungAndWildAndFree",
      "associatedTraits": [],
      "composition": [],
      "desc": "You can always move freely on Carousel rounds. Gain @Gold@ gold.",
      "effects": {
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Young-and-wild-and-free-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Young and Wild and Free",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticImplants1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @HP@ Health and @AD*100@% bonus Attack Damage.",
      "effects": {
          "AD": 0.10000000149011612,
          "HP": 80
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Implants I",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BaBoom",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions deal @BonusDamage*100@% more damage for @Duration@ seconds on every other cast.",
      "effects": {
          "BonusDamage": 0.8999999761581421,
          "Duration": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BaBoom_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ba-BOOM!",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_HyperRoll",
      "associatedTraits": [],
      "composition": [],
      "desc": "You earn no interest, but gain @Gold@ gold at the start of every player combat round.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Hyperroll2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hustler",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_CrownGuarded",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Crownguard. Your Crownguards' start of combat effect is @effectincrease*100@% stronger.",
      "effects": {
          "effectincrease": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crown-Guarded-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crown Guarded",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_GiantAndMighty",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gets larger, gaining @FlatHealth@ Health and +@PercentHealth*100@% max Health.",
      "effects": {
          "FlatHealth": 300,
          "PercentHealth": 0.03999999910593033,
          "{858a62b6}": 0.05000000074505806
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GiantandMighty_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant and Mighty",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticImplants3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @HP@ Health and @AD*100@% bonus Attack Damage.",
      "effects": {
          "AD": 0.30000001192092896,
          "HP": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Implants III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_LudensEcho3",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units cast and deal Ability damage, the first target hit and a nearby enemy take @MagicDamage1@-@MagicDamage4@ (based on current Stage) magic damage.",
      "effects": {
          "MagicDamage1": 90,
          "MagicDamage2": 130,
          "MagicDamage3": 170,
          "MagicDamage4": 210,
          "{26a9a9b1}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ludens-Echo-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Luden's Echo III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_EnshroudingStillness",
      "associatedTraits": [],
      "composition": [],
      "desc": "All enemies take @MaxHealthPerSecond@% of their max Health as true damage each second until they cast their Ability.<br>Gain a Shroud of Stillness.",
      "effects": {
          "MaxHealthPerSecond": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Mana-Burn-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mana Burn",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticImplants2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @HP@ Health and @AD*100@% bonus Attack Damage.",
      "effects": {
          "AD": 0.20000000298023224,
          "HP": 120
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Implants II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_LudensEcho2",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units cast and deal Ability damage, the first target hit and a nearby enemy take @MagicDamage1@-@MagicDamage4@ (based on current Stage) magic damage.",
      "effects": {
          "MagicDamage1": 50,
          "MagicDamage2": 70,
          "MagicDamage3": 90,
          "MagicDamage4": 110,
          "{26a9a9b1}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ludens-Echo-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Luden's Echo II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Replication",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of 3 components. For the next @RoundsOfBonusItems@ rounds, gain a copy of that component.",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Replication-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Replication",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_CrashTestDummies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Numdummies@ Target Dummies. Combat start: Your Target Dummies launch themselves towards the largest clump of enemies and Stun them for @stun@ seconds. ",
      "effects": {
          "NumDummies": 2,
          "SearchRange": 3,
          "Stun": 1.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Crash-Test-Dummies-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Crash Test Dummies",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_LudensEcho1",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units cast and deal Ability damage, the first target hit and a nearby enemy take @MagicDamage1@-@MagicDamage4@ (based on current Stage) magic damage.",
      "effects": {
          "MagicDamage1": 35,
          "MagicDamage2": 50,
          "MagicDamage3": 65,
          "MagicDamage4": 80,
          "{26a9a9b1}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ludens-Echo-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Luden's Echo I",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LuckyGlovesPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Thief's Gloves will always give your champions ideal items. Gain @NumGloves@ Sparring Gloves.",
      "effects": {
          "NumGloves": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Lucky-Gloves-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Gloves+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GiftsFromTheFallen",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @AD@% Attack Damage, @ap@ Ability Power, @Armor@ Armor, and @MR@ Magic Resist. <br><br>Each time an ally dies, gain these stats again.",
      "effects": {
          "AD": 3,
          "AP": 3,
          "Armor": 3,
          "MR": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gifts-from-the-Fallen-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gifts from the Fallen",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_OopsAllRageblades",
      "associatedTraits": [],
      "composition": [],
      "desc": "All your current and future completed items transform into Guinsoo's Rageblades that grant @ResistStackValue@ Armor and Magic Resist. Every @AttacksPerStack@ Rageblade stacks grant @StackValue@% Attack Damage and Ability Power.",
      "effects": {
          "AttacksPerStack": 2,
          "ResistStackValue": 35,
          "StackValue": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/OopsAllRageblades_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Anger Issues",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_TrashToTreasure",
      "associatedTraits": [],
      "composition": [],
      "desc": "Reforging completed items turns them into a random Artifact and does not consume the reforger. Gain a Reforger and @ComponentAnvils@ Component Anvil(s).",
      "effects": {
          "ComponentAnvils": 2,
          "Reforgers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TrashToTreasure_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trash to Treasure",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_PatienceIsAVirtue",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round, gain @FreeRerolls@ free rerolls if you did not buy a champion last round.",
      "effects": {
          "FreeRerolls": 2,
          "{4293de94}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PatienceIsAVirtue_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Patience is a Virtue",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_UnleashTheBeast",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Sterak's Gage. When its effect triggers, the holder gains @AttackSpeed*100@% Attack Speed for the rest of combat and immunity to crowd control for @CCImmunityDuration@ seconds.",
      "effects": {
          "AttackSpeed": 0.6000000238418579,
          "CCImmunityDuration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/UnleashtheBeast_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unleash The Beast",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_TinyButDeadly",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team is @TooltipSizeScale*100@% smaller, but moves and attacks @AttackSpeed*100@% faster.",
      "effects": {
          "AttackSpeed": 0.30000001192092896,
          "MoveSpeed": 0.75,
          "TooltipSizeScale": 0.5,
          "{858a62b6}": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TinyButDeadly_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny, but Deadly",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_UrfsGrabBag2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumSpatulas@ Spatula and @NumComponents@ random item component(s).",
      "effects": {
          "NumComponents": 3,
          "NumSpatulas": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Urfs-Grab-Bag-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Urf's Grab Bag II",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SharingIsCaring",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: You gain @YourGold@ gold and your opponent gains @EnemyGold@ gold.",
      "effects": {
          "EnemyGold": 1,
          "YourGold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SharingIsCaring_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sharing Is Caring",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LastStand",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you would be eliminated, you escape death and your team permanently gains @Health@ Health, @Resists@ Armor and Magic Resist, and @Omnivamp@% Omnivamp.",
      "effects": {
          "Health": 160,
          "Omnivamp": 16,
          "Resists": 16
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Last-Stand-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Last Stand",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_Scapegoat",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Training Dummy and @initialgold@ gold. If it is the first to die each player combat, gain @Gold@ gold.",
      "effects": {
          "Gold": 1,
          "InitialGold": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/The-Scapegoat-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scapegoat",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_MissedConnections",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a copy of each 1-cost champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missed-Connections-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Missed Connections",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_LuckyStreak_HR",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Gambler's Blade and a Magnetic Remover.<br><br><rules>Gambler's Blade helps you gain gold.</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Lucky-Streak-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Streak",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ACutAbove",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Deathblade. Champions holding this item have a @ProcChance*100@% chance to drop @Gold@ gold on kill.",
      "effects": {
          "Gold": 1,
          "ProcChance": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/A-Cut-Above-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "A Cut Above",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_PickOfTheLitter_Plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Open a special Shop with 3 free @ChampionTier@-cost champions. You can only pick 1, but you get @NumCopies@ copies of it.",
      "effects": {
          "ChampionTier": 4,
          "NumCopies": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PickOfTheLitter_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pick of the Litter+",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_BlankSlate",
      "associatedTraits": [],
      "composition": [],
      "desc": "Immediately sell your team (including bench) for @BonusGoldTOOLTIPONLY*100@% of their value. Your next @FreeRerolls@ Shop rerolls this round are free.",
      "effects": {
          "BonusGoldTOOLTIPONLY": 2,
          "BonusMultiplier": 1,
          "FreeRerolls": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blank-Slate-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blank Slate",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_ScoreboardScrapper",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every round, if you're in the bottom @BottomHalf@, your team permanently gains @LoserBoost*100@% Attack Damage and Ability Power. If you're in the top @UpperHalf@, they have @WinningStatBoost*100@% more Health.",
      "effects": {
          "BottomHalf": 4,
          "LoserBoost": 0.014999999664723873,
          "UpperHalf": 4,
          "WinningStatBoost": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ScoreboardScrapper_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scoreboard Scrapper",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_AbilityAmplification",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @AP@% stacking Ability Power every time they attack, up to @maxstacks@ stacks.",
      "effects": {
          "AP": 2,
          "MaxStacks": 99
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spellblade",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Ascension",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, your units gain @DamageAmp@% Damage Amp.",
      "effects": {
          "DamageAmp": 60,
          "Delay": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ascension2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ascension",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_GrandGambler",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumDice@ Loaded Dice and @Gold@ gold.",
      "effects": {
          "Gold": 5,
          "NumDice": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GrandGambler3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "High Roller",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Transfusion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 20,
          "BonusHPPerMissingHealth": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_WanderingTrainer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold and a Training Dummy with @NumOfEmblems@ permanently attached Emblems.",
      "effects": {
          "Gold": 6,
          "NumOfEmblems": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Wandering-Trainer-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wandering Trainer II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ThriftShop",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you reroll your Shop, gain @XP@ XP.",
      "effects": {
          "XP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WiseSpending3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wise Spending",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_FullyAdapted",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Adaptive Helm. Champions holding this item gain both effects, regardless of position.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Fully-Adapted-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fully Adapted",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ParentingForDummies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Training Dummy and @initialgold@ gold. If it is the first to die each player combat, gain @Gold@ gold.",
      "effects": {
          "Gold": 1,
          "InitialGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ParentingforDummies_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scapegoat",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_BigGains",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gains @StartingHealth@ bonus Health, and permanently gains @Health@ Health every @NumTakedowns@ takedowns.",
      "effects": {
          "Health": 20,
          "NumTakedowns": 2,
          "StartingHealth": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Big-Gains-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Big Gains",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_YouHaveMyBow",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Recurve Bow. Your units gain @AS@% Attack Speed. ",
      "effects": {
          "AS": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/You-Have-My-Bow-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "You Have My Bow",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ImpenetrableBulwark",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Bramble Vest, a Dragon's Claw, a Giant's Belt, and a Magnetic Remover.<br><br><rules>Useful for Magic Tanks or Attack Tanks!</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/StandBehind3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Impenetrable Bulwark",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_PandorasBench",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. At the start of every round, champions on the @BenchSlots@ rightmost bench slots transform into random champions of the same cost.",
      "effects": {
          "BenchSlots": 3,
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandoras-Bench-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Bench",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SlowAndSteady",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Exp@ XP now, and bonus XP equal to your level at the start of every player combat round. You can no longer use gold to level up.",
      "effects": {
          "EXP": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SlowAndSteady3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "March of Progress",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MakeshiftArmor1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @Resists@ Armor and Magic Resist.",
      "effects": {
          "Resists": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Makeshift1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Makeshift Armor I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MakeshiftArmor2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @Resists@ Armor and Magic Resist.",
      "effects": {
          "Resists": 45
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Makeshift2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Makeshift Armor II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_TomeOfTraits2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumTomes@ Tome of Traits and @Gold@ gold.",
      "effects": {
          "Gold": 5,
          "NumTomes": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AncientArchives3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ancient Archives II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LesserJeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your strongest unit gains @CritChance@% Critical Strike Chance and their abilities can critically strike.",
      "effects": {
          "CritChance": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MakeshiftArmor3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @Resists@ Armor and Magic Resist.",
      "effects": {
          "Resists": 65
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Makeshift3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Makeshift Armor III",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_Stimpack",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ components after you lose @HealthThreshold@ player health.<br><br>(Health lost this game: @TFTUnitProperty.item:TFT10_Augment_Stimpack_HealthLost@)",
      "effects": {
          "HealthThreshold": 50,
          "NumComponents": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stimpack-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stimpack",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_WindfallPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Windfall3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Windfall+",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_UpwardMobility",
      "associatedTraits": [],
      "composition": [],
      "desc": "Buying XP costs 1 less. Gain @Health@ Health and @Rerolls@ free rerolls whenever you level up.",
      "effects": {
          "Health": 3,
          "Rerolls": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/UpwardMobility_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Upward Mobility",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TargetDummies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumDummies@ Target Dummies.",
      "effects": {
          "NumDummies": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PhonyFrontline2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phony Frontline",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_JustKeepRolling",
      "associatedTraits": [],
      "composition": [],
      "desc": "After you reroll your Shop @Tier1Rolls@ times, rerolls only cost @RefreshCost@ gold.<br><br>(Rerolls this game: @TFTUnitProperty.item:TFT9_JustKeepRollingRolls@)",
      "effects": {
          "RefreshCost": 1,
          "Tier1Rolls": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pirates2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Frequent Flier",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_ReachTheSummit",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you reach Level @LevelReq@, gain @ExpBonus@ XP and @Gold@ Gold.",
      "effects": {
          "ExpBonus": 50,
          "Gold": 10,
          "LevelReq": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Reach-The-Summit-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Reach the Summit",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_BlossomingLotus2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team's Abilities can critically strike. Every @Interval@ seconds, your team gains @IntervalCritChance*100@% Critical Strike Chance.",
      "effects": {
          "Interval": 3,
          "IntervalCritChance": 0.11999999731779099
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blossoming-Lotus-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blossoming Lotus II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticBulk2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @health@ health.",
      "effects": {
          "Health": 300
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Bulk-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Bulk II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_BlossomingLotus1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team's Abilities can critically strike. Every @Interval@ seconds, your team gains @IntervalCritChance*100@% Critical Strike Chance.",
      "effects": {
          "Interval": 3,
          "IntervalCritChance": 0.05000000074505806
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blossoming-Lotus-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blossoming Lotus I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticBulk3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @health@ Health.",
      "effects": {
          "Health": 500
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Bulk-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Bulk III",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BigFriend",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat next to a unit with over @RequiredHealth@ Health take @DamageReductionPercent@% less damage for the rest of combat.",
      "effects": {
          "DamageReductionPercent": 7,
          "RequiredHealth": 1600
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Big-Friend-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Big Friend I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ExplosiveGrowthPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @XP@ XP.",
      "effects": {
          "XP": 11,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ExplosiveGrowth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Explosive Growth+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticBulk1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @health@ Health.",
      "effects": {
          "Health": 200
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Bulk-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Bulk I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Infusion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team restores @Mana@ Mana every @Interval@ seconds.",
      "effects": {
          "Interval": 5,
          "Mana": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Infusion-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Infusion",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_HelpIsOnTheWay",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @NumberOfCombats@ player combats, choose 1 of 4 Support items.",
      "effects": {
          "Numberofcombats": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Help-Is-On-The-Way-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Help Is On The Way",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_WithinTheMargins",
      "associatedTraits": [],
      "composition": [],
      "desc": "Start with a pool of @MaxGold@ gold. After each combat, subtract @MinusGoldPerUnit@ gold for each remaining champion alive on either team. After @Rounds@ rounds, gain all remaining gold.<br><br>Gold: @TFTUnitProperty.item:TFT_Augment_WithinTheMargins@<br>Rounds Remaining: @TFTUnitProperty.item:TFT_Augment_WithinTheMarginsRounds@",
      "effects": {
          "MaxGold": 80,
          "MinusGoldPerUnit": 4,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Within The Margins",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ExplosiveGrowth",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @XP@ XP.",
      "effects": {
          "XP": 8,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ExplosiveGrowth_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Explosive Growth",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUp",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUpRounds@%)",
      "effects": {
          "BaseAS": 8,
          "IncreasePerRound": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up I",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BestFriends3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units isolated in pairs gain @AS*100@% Attack Speed and @Armor@ Armor at the start of combat.",
      "effects": {
          "AS": 0.20000000298023224,
          "Armor": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Best-Friends-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Best Friends III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Formation1",
      "associatedTraits": [],
      "composition": [],
      "desc": "If you have 3 or more champions in the same row at the start of combat, they all gain @armor@ Armor and Magic Resist. ",
      "effects": {
          "Armor": 15,
          "MR": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Red-Rover-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unified Resistance I",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BestFriends2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units isolated in pairs gain @AS*100@% Attack Speed and @Armor@ Armor at the start of combat.",
      "effects": {
          "AS": 0.15000000596046448,
          "Armor": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Best-Friends-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Best Friends II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Meditation1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped restore @ManaRegen@ Mana per second.",
      "effects": {
          "ManaRegen": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Meditation-I-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Meditation I",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_ClutteredMind",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Units@ random 1-cost champions now. If your bench is full at the end of player combat, gain @XP@ XP. ",
      "effects": {
          "Units": 4,
          "XP": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dizzy-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cluttered Mind",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BestFriends1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Units isolated in pairs gain @AS*100@% Attack Speed and @Armor@ Armor at the start of combat.",
      "effects": {
          "AS": 0.11999999731779099,
          "Armor": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Best-Friends-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Best Friends I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Meditation3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped restore @ManaRegen@ Mana per second.",
      "effects": {
          "ManaRegen": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Meditation-III-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Meditation III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Formation2",
      "associatedTraits": [],
      "composition": [],
      "desc": "If you have 3 or more champions in the same row at the start of combat, they all gain @armor@ Armor and Magic Resist. ",
      "effects": {
          "Armor": 25,
          "MR": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Red-Rover-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unified Resistance II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_HardCommit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random emblem. Now and after each Carousel, gain a 1-star champion of that trait with a cost equal to the Stage (max 5).",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HardCommit_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hard Commit",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Meditation2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped restore @ManaRegen@ Mana per second.",
      "effects": {
          "ManaRegen": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Meditation-II-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Meditation II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BuildingACollectionPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures III",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Supercombobulator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Transform champions on your board into random ones of ANY cost. Equipped items are returned to your bench.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Supercombobulator",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GargantuanResolve",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Titan's Resolve. Your Titan's Resolves can continue stacking to @MaxStacks@ instead of 25.",
      "effects": {
          "MaxStacks": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gargantuan-Resolve-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gargantuan Resolve",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HealingOrbsI",
      "associatedTraits": [],
      "composition": [],
      "desc": "When an enemy dies, the nearest ally is healed for @Heal@.",
      "effects": {
          "Heal": 225
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Healing-Orbs-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Healing Orbs I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_PortableForgePlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Artifacts.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "ArmoryChoiceCount": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PortableForge2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portable Forge++",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Martyr",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever one of your allies die, your team heals for @Missinghealth@% of their max Health.",
      "effects": {
          "Missinghealth": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Martyr-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Martyr",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SocialDistancing3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Units with no adjacent allies gain @Stats@% Attack Damage and @Stats@ Ability Power.",
      "effects": {
          "Stats": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Social-Distance-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Social Distancing III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BlindingSpeed",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Red Buff, Guinsoo's Rageblade, a Recurve Bow and a Magnetic Remover.<br><br><rules>Useful for Attack Carries!</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Berserk-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blinding Speed",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_GoldenQuest",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you have @GoldRequired@ or more gold, gain a 2-star 5-cost champion and 2 items tailored to them.",
      "effects": {
          "goldrequired": 196
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AGoldenQuest_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "A Golden Quest",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TomeOfTraits1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumTomes@ Tome of Traits and @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "NumTomes": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AncientArchives2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ancient Archives I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SocialDistancing2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Units with no adjacent allies gain @Stats@% Attack Damage and @Stats@ Ability Power.",
      "effects": {
          "Stats": 16
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Social-Distance-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Social Distancing II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LuckyGloves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Thief's Gloves will always give your champions ideal items. Gain @NumGloves@ Sparring Gloves.",
      "effects": {
          "NumGloves": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Lucky-Gloves-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Gloves",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_EnduranceTraining",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team permanently gains @Health@ Health on enemy kill. Combat start: Your team gains @StartingHealth@ bonus Health.",
      "effects": {
          "Health": 18,
          "StartingHealth": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Endurance-Training-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Endurance Training",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_PortableForgePlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Artifacts.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "ArmoryChoiceCount": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PortableForge2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portable Forge+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Inconsistency",
      "associatedTraits": [],
      "composition": [],
      "desc": "If your streak is less than 3, gain 2 gold.",
      "effects": {
          "Gold": 2,
          "{379448fe}": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Inconsistency-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Inconsistency",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_FinalResistance",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each time an allied champion dies, @SunderPercentage@% Shred and Sunder the nearest @NumUnits@ enemies for @Duration@ seconds.<br><br><rules>Shred: reduces Magic Resist, Sunder: reduces Armor</rules>",
      "effects": {
          "Duration": 6,
          "NumUnits": 4,
          "ShredPercentage": 30,
          "SunderPercentage": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Final-Resistance-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Final Resistance",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TeamingUp1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ random component and @NumChamps@ random Tier 3 champions.",
      "effects": {
          "NumChamps": 2,
          "NumComponents": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Teaming-Up-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Teaming Up I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_RichGetRicherPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 18,
          "InterestCap": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rich Get Richer+",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Electrocharge3",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units receive critical strikes, they deal @Damage1@-@Damage4@ (based on current Stage) magic damage  to nearby enemies (@ICD@ second cooldown).",
      "effects": {
          "Damage1": 115,
          "Damage2": 155,
          "Damage3": 195,
          "Damage4": 235,
          "ICD": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Electrocharge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Electrocharge III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Electrocharge2",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units receive critical strikes, they deal @Damage1@-@Damage4@ (based on current Stage) magic damage  to nearby enemies (@ICD@ second cooldown).",
      "effects": {
          "Damage1": 50,
          "Damage2": 70,
          "Damage3": 90,
          "Damage4": 110,
          "ICD": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Electrocharge-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Electrocharge II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_AxiomArc2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @ManaGain@ Mana on kill.",
      "effects": {
          "ManaGain": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Axiom-Arc-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Axiom Arc II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Spellblades",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever one of your champion casts, their next attack deals bonus magic damage equal to @abilitypower*100@% of their Ability Power.",
      "effects": {
          "AbilityPower": 1.2000000476837158
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spellblades_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spellblades",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_BloodBank",
      "associatedTraits": [],
      "composition": [],
      "desc": "Every @Damage@ damage you deal to enemy tacticians gives you 2 gold.<br>(Current: @TFTUnitProperty.item:TFT11_BloodBankDamage@)",
      "effects": {
          "Damage": 8,
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BloodBank_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lunch Money",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Electrocharge1",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your units receive critical strikes, they deal @Damage1@-@Damage4@ (based on current Stage) magic damage  to nearby enemies (@ICD@ second cooldown).",
      "effects": {
          "Damage1": 30,
          "Damage2": 50,
          "Damage3": 70,
          "Damage4": 90,
          "ICD": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Electrocharge-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Electrocharge I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_WoodlandCharm",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your highest Health champion is cloned. You cannot equip items on the clone.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WoodlandCharm3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Woodland Charm",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TeamingUp2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random Support item and @NumUnits@ random 4-cost champions.",
      "effects": {
          "NumComponents": "null",
          "NumItems": 1,
          "NumUnits": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Teaming-Up-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Teaming Up II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ItemGrabBag2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random completed items and @NumReforgers@ Reforgers.",
      "effects": {
          "NumItems": 2,
          "NumReforgers": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemGrabBag3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Grab Bag II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_DravenSpoilsOfWar",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.25,
          "{ac7ef35a}": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_NotToday",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Edge of Night. Champions holding this item gain @AS@% Attack Speed.",
      "effects": {
          "AS": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Not-Today-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Not Today",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_WorthTheWaitGold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random @unittier@-cost champion. After @delay@ rounds, gain another copy of them at the start of each round for the rest of the game.<br><br>Champion: @TFTUnitProperty.item:TFT_Augment_WorthTheWait@",
      "effects": {
          "AdditionalCopies": 99,
          "Delay": 1,
          "UnitTier": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WorthTheWait_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Worth the Wait",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_TheOneWhoKnocks",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Silvermere Dawn. In @combatnum@ rounds, gain a Horizon Focus.<br><br><rules>One causes Stuns, and in 3 rounds, the other makes those Stuns hurt...a lot.</rules>",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The One Who Knocks",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ItemGrabBag1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random completed item.",
      "effects": {
          "NumItems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemGrabBag1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Grab Bag I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_GoingLong",
      "associatedTraits": [],
      "composition": [],
      "desc": "You no longer gain interest. Gain @Gold@ gold now. Round start: gain @XP@ XP.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 15,
          "XP": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Going-Long-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Going Long",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_UnleashedArcana",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Jeweled Gauntlet, a Rabadon's Deathcap, a Needlessly Large Rod, and a Magnetic Remover.<br><br><rules>Useful for Magic Carries or Magic Casters!</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LifelongLearner3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unleashed Arcana",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_PlaceboPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your team gains @AttackSpeed*100@% Attack Speed.",
      "effects": {
          "AttackSpeed": 0.019999999552965164,
          "Gold": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Placebo_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Placebo",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PhreakyFridayPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Infinity Force. After @CombatNum@ player combats, gain another.<br><br><rules>Infinity Force: Artifact that offers tons of offensive and defensive stats</rules>",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Phreaky-Friday-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phreaky Friday +",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TriForce1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 3 champions gain @Health@ Health, @Mana@ starting Mana, and @AttackSpeed@% Attack Speed.",
      "effects": {
          "AttackSpeed": 10,
          "Health": 150,
          "Mana": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tri-Force-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tri Force I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SunfireBoard",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of combat, burn all enemies for @TotalBurnPercent@% of their maximum Health over @Duration@ seconds and reduce healing received by @GrievousWoundsPercent@%.",
      "effects": {
          "Duration": 20,
          "GrievousWoundsPercent": 33,
          "TotalBurnPercent": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SunfireBoard2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sunfire Board",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TriForce3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 3 champions gain @Health@ Health, @Mana@ starting Mana, and @AttackSpeed@% Attack Speed.",
      "effects": {
          "AttackSpeed": 25,
          "Health": 200,
          "Mana": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tri-Force-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tri Force III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_IronAssets",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a component anvil and @Gold@ gold.<br><br><rules>The anvil offers 4 choices.</rules>",
      "effects": {
          "Gold": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Iron-Assets-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Iron Assets",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TriForce2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 3 champions gain @Health@ Health, @Mana@ starting Mana, and @AttackSpeed@% Attack Speed.",
      "effects": {
          "AttackSpeed": 15,
          "Health": 125,
          "Mana": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tri-Force-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tri Force II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_BeggarsCanBeChoosers",
      "associatedTraits": [],
      "composition": [],
      "desc": "You get +@ExtraRolls@ Augment rerolls for all other augment choices. Gain @gold@ gold.",
      "effects": {
          "ExtraRolls": 3,
          "Gold": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BeggarsCanBeChoosers_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Beggars Can Be Choosers",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_ThinkFast",
      "associatedTraits": [],
      "composition": [],
      "desc": "Shop rerolls are free until the end of this round. Traits and other augments do not benefit from these free Shops. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Think-Fast-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Think Fast",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Invested",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. At the start of each round, gain 1 Shop reroll for every @GoldPerReroll@ gold above @GoldThreshold@ (max @MaxGold@ gold).",
      "effects": {
          "Gold": 16,
          "GoldPerReroll": 10,
          "GoldThreshold": 50,
          "MaxGold": 80
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Invested-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invested",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_SupportSentinel",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumOfDummies@ Golem that fights for your team, holding @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Support-Sentinel-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Support Golem I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HedgeFundPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 30,
          "InterestCap": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hedge Fund+",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_SticksAndStones",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items Shred and Sunder enemies for @Duration@ seconds. Physical damage Sunders for @SunderPercentage@%, and magic damage Shreds for @ShredPercentage@%.<br><rules>Shred: reduces Magic Resist, Sunder: reduces Armor</rules>",
      "effects": {
          "Duration": 3,
          "ShredPercentage": 30,
          "SunderPercentage": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Sticks-And-Stones-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sticks And Stones",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_BlueBattery2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BonusAP@ Ability Power. After casting their Ability, set the caster's Mana to @ManaRestore@.",
      "effects": {
          "BonusAP": 20,
          "ManaRestore": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blue-Battery-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Battery II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CombatCaster",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @shieldamount1@-@shieldamount4@ Shield for @Duration@ seconds after casting their Ability. The Shield amount scales with round of the game.",
      "effects": {
          "Duration": 4,
          "ShieldAmount1": 80,
          "ShieldAmount2": 105,
          "ShieldAmount3": 135,
          "ShieldAmount4": 160
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Combat-Caster-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat Caster",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_BlueBattery1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BonusAP@ Ability Power. After casting their Ability, set the caster's Mana to @ManaRestore@.",
      "effects": {
          "BonusAP": 8,
          "ManaRestore": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blue-Battery-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blue Battery I",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_AFK",
      "associatedTraits": [],
      "composition": [],
      "desc": "You cannot perform actions for the next @RoundsToSkip@ rounds. Afterwards, gain @Gold@ gold.",
      "effects": {
          "Gold": 20,
          "RoundsToSkip": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AFK-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "AFK",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HedgeFund",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 22,
          "InterestCap": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hedge Fund",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StationarySupport3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumOfDummies@ Training Dummy with @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stationary-Support-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stationary Support III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StationarySupport2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumOfDummies@ Training Dummy with @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stationary-Support-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stationary Support II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_AnUpgradedJourney",
      "associatedTraits": [],
      "composition": [],
      "desc": "After upgrading @NumUpgrades@ champions to 3-star, gain a magnificent reward. Gain @NumStartUnits@ 1-cost champions.",
      "effects": {
          "NumStartUnits": 2,
          "NumUpgrades": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AnUpgradedAdventure_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "An Upgraded Adventure",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StationarySupport1",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @PlayerCombatRounds@ player combats, gain @NumOfDummies@ Training Dummy(s) with @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 1,
          "PlayerCombatRounds": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stationary-Support-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stationary Support I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LongDistanceRelationship2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your 2 units furthest from each other form a bond, sharing @PercentShare*100@% of their Armor, Magic Resist, Attack Damage, and Ability Power with each other.",
      "effects": {
          "PercentShare": 0.2199999988079071
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Long-Distance-Relationship-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Long Distance Pals",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_SacrificialPact",
      "associatedTraits": [],
      "composition": [],
      "desc": "Buying XP costs @HealthCost@ player health instead of 4 gold. Heal @Heal@ player health before each player combat.",
      "effects": {
          "Heal": 3,
          "HealthCost": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Sacrificial-Pact-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cruel Pact",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SocialDistancing",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Units with no adjacent allies gain @Stats@% Attack Damage and @Stats@ Ability Power.",
      "effects": {
          "Stats": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Social-Distance-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Social Distancing I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SalvageBin",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 1 random completed item now, and 1 component after @NumRounds@ player combats. Selling champions breaks completed items into components (excluding Tactician's items).",
      "effects": {
          "NumRounds": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Salvage2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Salvage Bin",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_RadiantRefactor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Masterwork Upgrade and @anvils@ component anvil.<br><br><rules>Masterwork Upgrade upgrades an item to Radiant!</rules>",
      "effects": {
          "anvils": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RadiantRefactor_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Radiant Refactor",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LearningFromExperience2",
      "associatedTraits": [],
      "composition": [],
      "desc": "After player combat, gain @winxp@ XP if you won or @lossxp@ XP if you lost.",
      "effects": {
          "lossxp": 3,
          "winxp": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Learning-From-Experience-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Patient Study",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_HighEndShopping",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions appear in your Shop as if you were 1 level higher. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HighEnd3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "High End Shopping II",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Slammin",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @components@ random Component(s). After each player combat, if there are no items on your bench (other than Consumables), gain @XP@ XP.",
      "effects": {
          "XP": 2,
          "XPNow": "null",
          "components": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Slammin_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Slammin'",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OneHundredDuckSizedHorses",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain +@TeamSize@ maximum team size, but your units can only hold 1 item and their total health is reduced by @HealthReduction*100@%. Gain @Gold@ gold.",
      "effects": {
          "Gold": 4,
          "HealthReduction": 0.15000000596046448,
          "TeamSize": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/100-Duck-Sized-Horses-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Endless Hordes",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DualPurpose",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you buy XP each round, gain @goldtogive@ gold. Whenever you buy XP, reroll your Shop.",
      "effects": {
          "goldtogive": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DualPurpose_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dual Purpose",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_HighVoltage",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Ionic Spark. Your Ionic Sparks have +@hexincreasetooltip@ hex radius and do @effectincrease*100@% more damage.",
      "effects": {
          "effectincrease": 0.25,
          "hexincreasetooltip": 3,
          "{f5a91c3a}": 680
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HighVoltage_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "High Voltage",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_SoulCollector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold per @HealthPerGold@ Health your Tactician loses.",
      "effects": {
          "Damage": 1,
          "{521fb564}": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blood-Money-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blood Money",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Distancing",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat with no adjacent allies gain a @MaxHealthShield@% max Health shield for @ShieldDuration@ seconds.",
      "effects": {
          "MaxHealthShield": 20,
          "ShieldDuration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Exiles1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Exiles I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CapriciousForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Blacksmith's Gloves, which equips two random Artifacts each round.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Prototype-Forge-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Capricious Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ReturnOnInvestment",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you reroll your Shop @RollCount@ times, gain a Tactician's Crown.<br><br>(Refreshes this game: @TFTUnitProperty.item:TFT9_ReturnOnInvestmentRolls@)",
      "effects": {
          "RollCount": 16
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldReserves2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Return on Investment",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_SpellcastersToolbox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Manazane. In @combatnum@ rounds, gain a Zhonya's Paradox.",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SpellcastersToolbox_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spellcaster's Toolbox",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TradeSectorPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll every round. Gain @Gold@ gold now.",
      "effects": {
          "Gold": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Trade2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trade Sector+",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_TwinTerror1",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusStats*10@ Health and @BonusStats@% Attack Speed. Anytime you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusStats": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Twin-Terror-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Twin Terror I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_Vampirism",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. Gain another @BonusHPPer5MissingHealth@ Health and @OmnivampPercentPer5MissingHealth*100@% Omnivamp per 5 missing player health.<br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "BaseHP": 20,
          "BonusHPPer5MissingHealth": 2,
          "OmnivampPercentPer5MissingHealth": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vampirism I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OneHundredDuckSizedHorsesPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain +@TeamSize@ maximum team size, but your units can only hold 1 item and their total health is reduced by @HealthReduction*100@%. Gain @Gold@ gold.",
      "effects": {
          "Gold": 14,
          "HealthReduction": 0.15000000596046448,
          "TeamSize": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/100-Duck-Sized-Horses-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Endless Hordes +",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_TwinTerror2",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusStats*10@ Health and @BonusStats@% Attack Speed. Anytime you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusStats": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Twin-Terror-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Twin Terror II",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Accomplice",
      "associatedTraits": [],
      "composition": [],
      "desc": "Get a Support Thief's Gloves and&nbsp;@gold@&nbsp;gold.",
      "effects": {
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Accomplice_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Accomplice",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Mentorship1",
      "associatedTraits": [],
      "composition": [],
      "desc": "If an ally starts combat next to a higher-cost ally, it gains @AS*100@% Attack Speed and @Health@ Health.",
      "effects": {
          "AS": 0.11999999731779099,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Mentorship-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mentorship I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_InspiringEpitaph",
      "associatedTraits": [],
      "composition": [],
      "desc": "When a unit dies, the nearest ally gains a @ShieldRatio*100@% max Health Shield and @AttackSpeed*100@% stacking Attack Speed.",
      "effects": {
          "AttackSpeed": 0.10000000149011612,
          "ShieldRatio": 0.20000000298023224
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Inspiring-Epitaph-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Inspiring Epitaph",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Mentorship2",
      "associatedTraits": [],
      "composition": [],
      "desc": "If an ally starts combat next to a higher-cost ally, it gains @AS*100@% Attack Speed and @Health@ Health.",
      "effects": {
          "AS": 0.18000000715255737,
          "Health": 220
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Mentorship-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Mentorship II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_FindYourCenter",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champion that starts combat in the center of the board gains @BonusDamage*100@% Damage Amp and @BonusHealth*100@% max Health.",
      "effects": {
          "BonusDamage": 0.15000000596046448,
          "BonusHealth": 0.15000000596046448
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FindYourCenter_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Find Your Center",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_GoodForSomethingSilver",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items have a @dropchance*100@% to drop @Gold@ gold on death.",
      "effects": {
          "DropChance": 0.5,
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Good-For-Something-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Good For Something I",
      "unique": false
  },
  {
      "apiName": "TFT8_Augment_SalvageBinPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain 1 random completed item now, and 1 component after @NumRounds@ player combats. Selling champions breaks completed items into components (excluding Tactician's items).",
      "effects": {
          "NumRounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Salvage2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Salvage Bin+",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Keepers1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: grant units with adjacent allies a @ShieldHealth@ Health Shield for @ShieldDuration@ seconds. This Shield stacks.",
      "effects": {
          "ShieldDuration": 8,
          "ShieldHealth": 145
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Keepers-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Keepers I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_LowInterestRates",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your max interest is capped at @InterestCap@ gold but you gain @Gold@ gold at the start of every player combat.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 2,
          "InterestCap": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Low-Interest-Rates-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Low Interest Rates",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Keepers2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: grant units with adjacent allies a @ShieldHealth@ Health Shield for @ShieldDuration@ seconds. This Shield stacks.",
      "effects": {
          "ShieldDuration": 8,
          "ShieldHealth": 230
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Keepers-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Keepers II",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_LuckyStreak",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Gambler's Blade and a Magnetic Remover.<br><br><rules>Gambler's Blade helps you gain gold.</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Lucky-Streak-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lucky Streak",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Flexible",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @StartingEmblems@ random emblem. At the start of every Stage, gain a random emblem. Your team gains @HPPerEmblem@ Health for each emblem they are holding.",
      "effects": {
          "BonusStages": 99,
          "HPPerEmblem": 40,
          "StartingEmblems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ComponentGrabBag-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Flexible",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_RestartMission",
      "associatedTraits": [],
      "composition": [],
      "desc": "Remove all champions on your board and bench. Gain @3Cost@ random 2-star 3-costs,  @2Cost@ 2-star 2-costs, and @1Cost@ 2-star 1-cost champion.",
      "effects": {
          "1Cost": 1,
          "2Cost": 3,
          "3Cost": 2,
          "NumUnits": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RestartMission_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Restart Mission",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DuoQueue",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumUnits@ random 5-cost champions and @NumComponents@ copies of a random component.",
      "effects": {
          "NumComponents": 2,
          "NumUnits": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DuoQueue_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Duo Queue",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Preparation3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions on your bench permanently gain @HPBonus@ Health, @Stats@% Attack Damage, and @Stats@ Ability Power every round. Champions start with @StartingStacks@ stack of this effect, and can stack up to @MaxStacks@ times.",
      "effects": {
          "HPBonus": 50,
          "MaxStacks": 4,
          "StartingStacks": 1,
          "Stats": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Preparation-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Preparation III",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Preparation2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions on your bench permanently gain @HPBonus@ Health, @Stats@% Attack Damage, and @Stats@ Ability Power every round. Champions start with @StartingStacks@ stack of this effect, and can stack up to @MaxStacks@ times.",
      "effects": {
          "HPBonus": 35,
          "MaxStacks": 4,
          "StartingStacks": 1,
          "Stats": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Preparation-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Preparation II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Traitless2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units with no Traits active gain @HP1@-@HP4@ Health and @AS1@-@AS4@% Attack Speed (based on current Stage).",
      "effects": {
          "AS1": 45,
          "AS2": 50,
          "AS3": 55,
          "AS4": 60,
          "HP1": 240,
          "HP2": 330,
          "HP3": 420,
          "HP4": 530
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BuiltDifferent2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Built Different II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_RedBuff",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team's attacks burn their targets for @BurnPercent@% of their max Health over @Duration@ seconds. Attacks also reduce their targets' healing received by @HealingReductionPct@%.",
      "effects": {
          "BurnPercent": 5,
          "Duration": 5,
          "HealingReductionPct": 33
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Red-Buff-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blistering Strikes",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Traitless3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units with no Traits active gain @HP1@-@HP4@ Health and @AS1@-@AS4@% Attack Speed (based on current Stage).",
      "effects": {
          "AS1": 50,
          "AS2": 55,
          "AS3": 60,
          "AS4": 70,
          "HP1": 300,
          "HP2": 400,
          "HP3": 500,
          "HP4": 600
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BuiltDifferent3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Built Different III",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_TwoforOne",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round, get a copy of the first champion you buy that costs 3 or less.",
      "effects": {
          "Gold": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TwoForOne_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Two for One",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_DangerousToGoAlone",
      "associatedTraits": [],
      "composition": [],
      "desc": "When a champion dies, the nearest ally with open slots receives a temporary copy of an item they were holding and a @shieldratio*100@% max Health Shield.",
      "effects": {
          "ShieldRatio": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/It_s-Dangerous-to-Go-Alone-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Parting Gifts",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Slammin_Plus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @components@ random component(s) and @XPNow@ XP now. After each player combat, if there are no items on your bench (other than Consumables), gain @XP@ XP.",
      "effects": {
          "XP": 2,
          "XPNow": 10,
          "components": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Slammin_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Slammin'+",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Diversify2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AD*100@% Attack Damage and @AP@ Ability Power for each non-unique Trait active across your team.",
      "effects": {
          "AD": 0.02500000037252903,
          "AP": 2.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/StandUnited2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stand United II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_WithinTheMarginsPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Start with a pool of @MaxGold@ gold. After each combat, subtract @MinusGoldPerUnit@ gold for each remaining champion alive on either team. After @Rounds@ rounds, gain all remaining gold.<br><br>Gold: @TFTUnitProperty.item:TFT_Augment_WithinTheMargins@<br>Rounds Remaining: @TFTUnitProperty.item:TFT_Augment_WithinTheMarginsRounds@",
      "effects": {
          "MaxGold": 100,
          "MinusGoldPerUnit": 4,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Within the Margins+",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MaxLevel10",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you buy XP, gain an additional @XP@. Gain @InitialXP@ immediately.",
      "effects": {
          "InitialXP": 12,
          "XP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LevelUp3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Level Up!",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Diversify3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AD*100@% Attack Damage and @AP@ Ability Power for each non-unique Trait active across your team.",
      "effects": {
          "AD": 0.03500000014901161,
          "AP": 3.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/StandUnited3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stand United III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ThrillOfTheHunt1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units heal @MissingHPHeal@ Health on kill.",
      "effects": {
          "MissingHPHeal": 300
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ThrillHunt1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thrill of the Hunt I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Traitless1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units with no Traits active gain @HP1@-@HP4@ Health and @AS1@-@AS4@% Attack Speed (based on current Stage).",
      "effects": {
          "AS1": 25,
          "AS2": 35,
          "AS3": 45,
          "AS4": 55,
          "HP1": 200,
          "HP2": 225,
          "HP3": 250,
          "HP4": 300
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BuiltDifferent1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Built Different I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SecondWind2",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, your units heal @HealPercent@% of their missing Health.",
      "effects": {
          "Delay": 10,
          "HealPercent": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Second--Wind-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Second Wind II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_SecondWind1",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, your units heal @HealPercent@% of their missing Health.",
      "effects": {
          "Delay": 10,
          "HealPercent": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Second--Wind-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Second Wind I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Diversify1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @AD*100@% Attack Damage and @AP@ Ability Power for each non-unique Trait active across your team.",
      "effects": {
          "AD": 0.014999999664723873,
          "AP": 1.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/StandUnited1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stand United I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_JeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @critchance@% Critical Strike chance, and their Abilities can critically strike.",
      "effects": {
          "CritChance": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StarsAreBorn",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first 1-cost and 2-cost champions you buy are instantly upgraded to 2-star. Gain @Gold@ gold.",
      "effects": {
          "Gold": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stars-are-born-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stars are Born",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ThrillOfTheHunt2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units heal @MissingHPHeal@ Health on kill.",
      "effects": {
          "MissingHPHeal": 500
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ThrillHunt2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thrill of the Hunt II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_TraitTracker",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you activate @NumTraits@ non-unique traits for 1 combat, gain @NumEmblems@ random emblems.",
      "effects": {
          "NumEmblems": 6,
          "NumTraits": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TraitTracker_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trait Tracker",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_BinaryAirdrop",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: champions holding 2 items gain a recommended 3rd completed item. Gain @Gold@ gold.",
      "effects": {
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BinaryAirdrop3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Binary Airdrop",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_IndomitableWill",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your team scores a takedown, they shed all negative effects and become immune to crowd control for @duration@ seconds.",
      "effects": {
          "Duration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Indomitable-Will-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Indomitable Will",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_OneTwoFive",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ random component, @Gold@ gold, and @NumChamps@ random 5-cost champion.",
      "effects": {
          "Gold": 2,
          "NumChamps": 1,
          "NumComponents": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/One-Two-Five-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "One, Two, Five!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SilverSpoon",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.<br>",
      "effects": {
          "Experience": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Silver-Spoon-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silver Spoon",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_LearningToSpell",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @StartingAP@ bonus Ability Power, and permanently gains @AP@ Ability Power every @NumTakedowns@ takedowns.",
      "effects": {
          "AP": 1,
          "NumTakedowns": 2,
          "StartingAP": 18
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Learning-To-Spell-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Learning to Spell",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_FortuneFavorsTheBold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Winning combat against a player will give bonus orbs. The longer your loss streak, the bigger the payout.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FortuneFavorsTheBold_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fortune Favors the Bold",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AllNatural2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items gain @health@ Health and heal for @Healing*100@% of their max Health each second.",
      "effects": {
          "Healing": 0.019999999552965164,
          "Health": 150
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/All-Natural-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Natural II",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_EpochPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Now, and at the start of every stage, gain @XP@ XP and @Rerolls@ free rerolls.",
      "effects": {
          "Rerolls": 3,
          "XP": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Epoch_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Epoch+",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_GoldenRemover",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Golden Remover and component item anvil.<br><br><rules>Golden Remover is an Item Remover with infinite uses.</rules>",
      "effects": {
          "Anvil": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldenRemover_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": " The Golden Remover",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BuildingACollection",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_EarlyEducation",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team permanently gains @AP@ Ability Power whenever they kill an enemy. Combat start: Your team gains @StartingAP@ bonus Ability Power.",
      "effects": {
          "AP": 1,
          "StartingAP": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Early-Education-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Early Education",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_RanduinsImmovableObject",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Randuin's Omen. Its range is increased by 1 hex and its effect is increased by @effectincrease*100@%.",
      "effects": {
          "effectincrease": 0.6000000238418579,
          "{9f11e38f}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RanduinsImmovableObject_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Immovable Object",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OneTwosThree",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @tier1champs@ 1-cost champion, @numchamps@ 2-cost champions, and 1 3-cost champion.",
      "effects": {
          "NumChamps": 2,
          "tier1champs": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Threes-Company-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ones Twos Three",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SupportCache",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Support items.",
      "effects": {
          "ArmoryChoiceCount": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Support-Cache-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Support Cache",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PhreakyFriday",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Infinity Force. After @CombatNum@ player combats, gain another.<br><br><rules>Infinity Force: Artifact that offers tons of offensive and defensive stats</rules>",
      "effects": {
          "CombatNum": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Phreaky-Friday-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Phreaky Friday",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_VerdantVeil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units are immune to crowd control effects for the first @Duration@ seconds of combat and gain @BonusAS*100@% bonus Attack Speed.",
      "effects": {
          "BonusAS": 0.15000000596046448,
          "Duration": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Verdant-Veil-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Verdant Veil",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HighEndSector",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you level up, gain a number of free shop refreshes equal to your level. Gain @gold@ gold. ",
      "effects": {
          "Gold": 4,
          "{a9ad6d1b}": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Trade3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shopping Spree",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_WindfallPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 45
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Windfall3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Windfall++",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_JeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @critchance@% Critical Strike chance, and their Abilities can critically strike.",
      "effects": {
          "CritChance": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ImpromptuInventions",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Up to @MaxComponents@ equipped components turn into completed items for the rest of combat. Gain a component at the start of the next @NumStages@ stages.",
      "effects": {
          "MaxComponents": 5,
          "NumStages": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Impromptu-Invention-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scrappy Inventions",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_LethalTempo",
      "associatedTraits": [],
      "composition": [],
      "desc": "When your team attacks, they gain @AttackSpeed*100@% Attack Speed, up to @AttackSpeed*100*MaxStacks@%.<br><br>Your team gains @AttackSpeed*100@% stacking Attack Speed every time they attack, up to 10 stacks.",
      "effects": {
          "AttackSpeed": 0.03999999910593033,
          "MaxStacks": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lethal Tempo",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ComponentGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumComponents@ random item components.",
      "effects": {
          "NumComponents": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ComponentGrabBag-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Component Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_CursedCrown",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain +@MaxArmySizeIncrease@ max team size, but take @PlayerCombatDamageIncrease@% more player damage when you lose a player combat.",
      "effects": {
          "MaxArmySizeIncrease": 2,
          "PlayerCombatDamageIncrease": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CursedCrown-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cursed Crown",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_RainingGoldPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @InstantGold@ gold now and @RoundGold@ gold every&nbsp;round.",
      "effects": {
          "InstantGold": 18,
          "RoundGold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RainingGold_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Raining Gold+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_InfernalContract",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your max level is 7. Gain @augmentgold@ gold.",
      "effects": {
          "AugmentGold": 90
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Infernal-Contract-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Infernal Contract",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CustomerIsAlwaysRight",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever you would get a component, gain a component anvil instead. Gain a random component.<br><br><rules>The anvil offers 4 choices.</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/The-customer-is-always-right-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Component Buffet",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Prizefighter",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @component@ item component(s). Every @WinsNeeded@ wins gives you an item&nbsp;component.",
      "effects": {
          "WinsNeeded": 4,
          "component": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PrizeFighter_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Prizefighter",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_HeroicGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @LesserDuplicatorAmount@ Lesser Champion Duplicators and @gold@ gold.<br><br><rules>This item allows you to copy a 3-cost or less champion.</rules>",
      "effects": {
          "Gold": 9,
          "LesserDuplicatorAmount": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Heroic-Grab-Bag-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Heroic Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Preparation",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions on your bench permanently gain @HPBonus@ Health, @Stats@% Attack Damage, and @Stats@ Ability Power every round. Champions start with @StartingStacks@ stack of this effect, and can stack up to @MaxStacks@ times.",
      "effects": {
          "HPBonus": 25,
          "MaxStacks": 4,
          "StartingStacks": 1,
          "Stats": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Preparation-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Preparation I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_InvestedPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. At the start of each round, gain 1 Shop reroll for every @GoldPerReroll@ gold above @GoldThreshold@ (max @MaxGold@ gold).",
      "effects": {
          "Gold": 45,
          "GoldPerReroll": 10,
          "GoldThreshold": 50,
          "MaxGold": 80
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Invested-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invested++",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DawnbringersBlessing1",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time each ally unit falls below @HealthThreshold*100@% health, they restore @FlatHealing1@-@flathealing3@ health (based on stage) over @Duration@ seconds.",
      "effects": {
          "Duration": 2,
          "FlatHealing1": 130,
          "FlatHealing2": 220,
          "FlatHealing3": 325,
          "HealthThreshold": 0.6000000238418579
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dawnbringer-Spirit-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat Bandages I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_RollTheDice",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Rascal's Gloves item. This equips 2 random Radiant items every round.<br><br><rules>Radiant items are very powerful versions of completed items.</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Roll-the-Dice-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Roll The Dice",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DawnbringersBlessing2",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time each ally unit falls below @HealthThreshold*100@% health, they restore @FlatHealing1@-@flathealing3@ health (based on stage) over @Duration@ seconds.",
      "effects": {
          "Duration": 2,
          "FlatHealing1": 200,
          "FlatHealing2": 325,
          "FlatHealing3": 500,
          "HealthThreshold": 0.6000000238418579
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Dawnbringer-Spirit-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat Bandages II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Ascension",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, your units gain @DamageAmp@% Damage Amp.",
      "effects": {
          "DamageAmp": 60,
          "Delay": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ascension2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ascension",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PandorasItems2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized.<br><br>Gain @NumComponents@ random components.",
      "effects": {
          "NumCompletedItems": "null",
          "NumComponents": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_SilverTicket",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each time your Shop is rerolled, you have a @RerollPercent@% chance to gain a free reroll. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "RerollPercent": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldenTicket2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Golden Ticket",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Recombobulator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions on your board permanently transform into random champions 1 cost tier higher. Gain @NumRemovers@ Magnetic Removers.",
      "effects": {
          "NumRemovers": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Recombobulator-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Recombobulator",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_OverEncumbered",
      "associatedTraits": [],
      "composition": [],
      "desc": "For the next stage, you only get @BenchSlots@ bench slot. After, get @Components@ item&nbsp;components.",
      "effects": {
          "BenchSlots": 1,
          "Gold": "null",
          "components": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/OverEncumbered_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Over Encumbered",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HedgeFundPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 40,
          "InterestCap": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hedge Fund++",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_LittleBuddies",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your 4-cost and 5-cost champions gain @health@ Health and @AttackSpeed*100@% Attack Speed  for every 1-cost and 2-cost champion on your board.",
      "effects": {
          "AttackSpeed": 0.09000000357627869,
          "Health": 65,
          "{0d14760d}": 4,
          "{82aeb8a7}": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Little-Buddies-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Little Buddies",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DarkAlleyDealings",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Suspicious Trenchcoat. After @CombatNum@ player combats, gain a Trickster's Glass.",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DarkAlleyDealings_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dark Alley Dealings",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TransfusionPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 50,
          "BonusHPPerMissingHealth": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion III",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ThornPlatedArmor",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Bramble Vest. Your Bramble Vests deal @damageamp1*100@-@damageamp4*100@% more damage (based on Stage) and heal the holder for @heal*100@% of the damage dealt.",
      "effects": {
          "DamageAmp1": 0.05000000074505806,
          "DamageAmp2": 0.30000001192092896,
          "DamageAmp3": 0.699999988079071,
          "DamageAmp4": 1,
          "Heal": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ThornPlatedArmor_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Thorn-Plated Armor",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUp3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp3Rounds@%)",
      "effects": {
          "BaseAS": 12,
          "IncreasePerRound": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up III",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_ShockTreatment",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Statikk Shiv. Your Statikk Shivs' chain lightning effects deal @tooltipincreaseddamage1*100@-@tooltipincreaseddamage2*100@% more damage (based on stage level).",
      "effects": {
          "DamageAmp1": 1.399999976158142,
          "DamageAmp2": 1.7999999523162842,
          "DamageAmp3": 2.25,
          "tooltipincreaseddamage1": 0.4000000059604645,
          "tooltipincreaseddamage2": 1.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Shock-Treatment-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shock Treatment",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PumpingUp2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp2Rounds@%)",
      "effects": {
          "BaseAS": 10,
          "IncreasePerRound": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_VerticallyInclined",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseDamageAmp@% Damage Amp.<br><br>Gain @FullDamageAmp@% Damage Amp instead if you have less active non-unique traits than your opponent.",
      "effects": {
          "BaseDamageAmp": 9,
          "FullDamageAmp": 18
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vertically-Inclined-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vertically Inclined",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_CalledShot",
      "associatedTraits": [],
      "composition": [],
      "desc": "Set your win streak to +@Streak@. Gain @gold@ gold.",
      "effects": {
          "Gold": 4,
          "Streak": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CalledShot_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Called Shot",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_WhatDoesntKillYou",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold after losing a player combat. Gain a random component after every @RoundsPerComponent@ losses.<br><br><tftitemrules>Losses until next component: @TFTUnitProperty.item:TFT9_Augment_WhatDoesntKillYou_Counter@</tftitemrules>",
      "effects": {
          "Gold": 2,
          "RoundsPerComponent": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/What-Doesn_t-Kill-You-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "What Doesn't Kill You",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticShell1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and @Resists@ Armor.",
      "effects": {
          "Health": 80,
          "Resists": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Shell-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Shell I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_InvestedPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. At the start of each round, gain 1 Shop reroll for every @GoldPerReroll@ gold above @GoldThreshold@ (max @MaxGold@ gold).",
      "effects": {
          "Gold": 26,
          "GoldPerReroll": 10,
          "GoldThreshold": 50,
          "MaxGold": 80
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Invested-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Invested+",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_RainingGold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @InstantGold@ gold now and @RoundGold@ gold every&nbsp;round.",
      "effects": {
          "InstantGold": 8,
          "RoundGold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RainingGold_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Raining Gold",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticShell3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and @Resists@ Armor.",
      "effects": {
          "Health": 200,
          "Resists": 60
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Shell-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Shell III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticShell2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and @Resists@ Armor.",
      "effects": {
          "Health": 120,
          "Resists": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Shell-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Shell II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MetabolicAccelerator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Heal@ player health after every player combat. Your Tactician also moves faster.",
      "effects": {
          "Heal": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MetabolicAccel2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Metabolic Accelerator",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Idealism",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Hand of Justice. Champions holding this item deal @DamageAmp*100@% increased damage.",
      "effects": {
          "DamageAmp": 0.11999999731779099
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Idealism-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Idealism",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ClearMind",
      "associatedTraits": [],
      "composition": [],
      "desc": "If there are no champions on your bench at the end of player combat, gain @XP@ XP.",
      "effects": {
          "XP": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ClearMind2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Clear Mind",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_PerfectLoss",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you win or lose combat by @UnitThreshold@ or fewer units, gain @GoldToGive@ gold next round.",
      "effects": {
          "UnitThreshold": 3,
          "goldtogive": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PerfectLoss_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Precise Planning",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_WorthTheWaitPrismatic",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random @unittier@-cost champion. Gain another copy at the start of each round for the next @AdditionalCopies@ rounds.<br><br>Champion: @TFTUnitProperty.item:TFT_Augment_WorthTheWait@",
      "effects": {
          "AdditionalCopies": 8,
          "Delay": "null",
          "UnitTier": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/WorthTheWait_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Worth the Wait II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_YouHaveMySword",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a B.F. Sword. Your units gain @AD@% Attack Damage. ",
      "effects": {
          "AD": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/You-Have-My-Sword-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "You Have My Sword",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_MikaelsGift",
      "associatedTraits": [],
      "composition": [],
      "desc": "Aura items that buff your team have their effects increased by @AuraIncreasePercent*100@%. Gain a Locket of the Iron Solari.",
      "effects": {
          "AuraIncreasePercent": 0.33000001311302185
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Better-Together-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Better Together",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ItemLadder",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a temporary item that unequips and transforms at the start of each round. The item quality increases each Stage.",
      "effects": {
          "ChampionTier": 4,
          "GoldPerStage": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemLadder_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Ladder",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_HeadStart",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @numunits@ random 2-star @tier@ cost champions. Disable your Shop for the next @roundstoskip@ rounds.",
      "effects": {
          "NumUnits": 3,
          "RoundsToSkip": 3,
          "Tier": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/HeadStart_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Head Start",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_SwitchingGears",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold whenever you break your win or loss streak.",
      "effects": {
          "Gold": 3,
          "{379448fe}": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Switching-Gears-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Switching Gears",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_WanderingTrainerGold",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold and a Training Dummy with @NumOfEmblems@ permanently attached Emblems.",
      "effects": {
          "Gold": 1,
          "NumOfEmblems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Wandering-Trainer-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wandering Trainer I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_RollingForDays",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Numrolls@ free Shop rerolls.",
      "effects": {
          "Numrolls": 11
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Rolling-For-Days-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rolling For Days I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ClockworkAccelerator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @attackspeed*100@% Attack Speed every @frequency@ seconds in combat.",
      "effects": {
          "AttackSpeed": 0.10000000149011612,
          "Frequency": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ClockworkAccelerator_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Clockwork Accelerator",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_BandOfThieves2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumGloves@ Thief's Gloves.",
      "effects": {
          "NumGloves": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BandThieves3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Band of Thieves II",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Buildabud",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random 3-star 1-cost champion and @gold@ gold.",
      "effects": {
          "Gold": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BuildABud_III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Build a Bud!",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_HeavyHitters",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units with at least @MaxHealthThreshold@ max Health gain Attack Damage and Ability Power equal to @PercentMaxHealthDamage*100@% of their max Health.",
      "effects": {
          "MaxHealthThreshold": 1500,
          "PercentMaxHealthDamage": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Heavy-Hitters-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Heavy Hitters",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_TwoTanky",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusHealth@ Health. When one copy dies, the other gains a @OnDeathPercHeal*100@% max health Shield for @HealDuration@ seconds. When you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusHealth": 550,
          "HealDuration": 6,
          "OnDeathPercHeal": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Two-Tanky-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Two Tanky",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_Determinedinvestors",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you have @goldrequired@ gold at the end of combat, gain Diamond Hands and @numcomponents@ random component(s).<br><br><rules>This defensive item helps you gain more gold.</rules>",
      "effects": {
          "NumComponents": 2,
          "goldrequired": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/A-Determined-Investor-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Determined Investors",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_FinalAscension",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @damageamp@% Damage Amp. After @delay@ seconds, this increases to @AscendedAmpTOOLTIPONLY@% Damage Amp.",
      "effects": {
          "AscendedAmpTOOLTIPONLY": 50,
          "DamageAmp": 20,
          "Delay": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ascension3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Final Ascension",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_FirstAidKit2",
      "associatedTraits": [],
      "composition": [],
      "desc": "All healing and shielding on your units is increased by @HealShieldIncrease*100@%.",
      "effects": {
          "HealShieldIncrease": 0.3499999940395355
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FirstAidKit2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "First Aid Kit II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_TheFloorIsLava",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies on your side of the board are wounded and take @BurnPercentTooltipOnly@% of their max Health in magic damage every second.",
      "effects": {
          "BurnPercentTooltipOnly": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TheFloorisLava_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "The Floor Is Lava",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_DragonSpirit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Dragon's Claw. Champions equipped with a Dragon's Claw gain @Health@ Health and @Durability@% Durability.",
      "effects": {
          "Durability": 10,
          "Health": 100,
          "HealthCap": 7000,
          "MaxComponents": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DragonsSpirit_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Dragon's Spirit",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Consistency",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain double win and loss streak gold.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Consistency-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Consistency",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_OnTheHouse",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever you star up a champion, gain @gold@ gold. Gain @augmentselectbonusgold@ gold now.",
      "effects": {
          "Gold": 1,
          "TurnLimit": 99,
          "augmentselectbonusgold": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/OnTheHouse_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On The House",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BronzeTicket",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll after every @RollNumber@ rerolls. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "RollNumber": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldenTicket1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silver Ticket",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Contagion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: The highest Health enemy takes @DamageAmp*100@% more damage. Every @SpreadTimer@ seconds or on death, this effect spreads to @SpreadTargets@ nearby enemies.",
      "effects": {
          "DamageAmp": 0.18000000715255737,
          "SpreadTargets": 2,
          "SpreadTimer": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Contagion-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Contagion",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_StarterKit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a 4-cost champion, a 2-star 1-cost champion that shares a trait with them, and @Gold@ gold.<br><br>At the start of the next @FutureChampionCount@ stages, gain that 4-cost champion again.",
      "effects": {
          "FutureChampionCount": 2,
          "Gold": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Starter-Kit-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Starter Kit",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LategameSpecialist",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you reach Level @LevelReq@, gain @Gold@ gold.",
      "effects": {
          "Gold": 33,
          "LevelReq": 9
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Late-Game-Specialist-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Lategame Specialist",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_TooMuchCandy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your rerolls cost @StartingCost@ gold. Every @NumUntilIncrease@ rerolls, the cost goes up by @IncreaseBy@ gold. At the start of each stage your reroll cost is reset to @StartingCost@.",
      "effects": {
          "IncreaseBy": 1,
          "NumUntilIncrease": 6,
          "StartingCost": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/TooMuchCandy_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Too Much Candy",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BirthdayPresents",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a 2-star champion every time you level up. The champion's cost tier is your level minus 4 (min: 1-cost).",
      "effects": {
          "Gold": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Golden-Gifts-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Birthday Present",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_IRA",
      "associatedTraits": [],
      "composition": [],
      "desc": "You have no max interest. Any interest above @MinInterest@ gold gets converted to @XPPerGold@ XP each. Get @Gold@ gold.",
      "effects": {
          "Gold": 10,
          "InterestCap": 20,
          "MinInterest": 5,
          "XPPerGold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "IRA",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AllNatural",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items gain @health@ Health and heal for @Healing*100@% of their max Health each second.",
      "effects": {
          "Healing": 0.009999999776482582,
          "Health": 120
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/All-Natural-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "All Natural I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ShimmerscaleEssence",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Mogul's Mail. In @combatnum@ rounds, gain a Gamblers Blade.<br><br><rules>These items give gold as well as combat power.</rules>",
      "effects": {
          "CombatNum": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ShimmerscaleEssence_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shimmerscale Essence",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Shoplifting",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of each turn, gain the highest Tier champion in your shop for free.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Shoplifting-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shoplifting",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_BranchingOut",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random Emblem and a Reforger.<br><br><rules>Reforgers allow you to remake any item.</rules>",
      "effects": {
          "Numberofcombats": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Branching-Out-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Branching Out",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_DravenSpoilsOfWar3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.4000000059604645,
          "{ac7ef35a}": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_DravenSpoilsOfWar2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.30000001192092896,
          "{ac7ef35a}": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_SubscriptionService",
      "associatedTraits": [],
      "composition": [],
      "desc": "Now, and at the start of each Stage, open a Shop of 4 unique 4-cost champions and gain @GoldPerStage@ gold.",
      "effects": {
          "ChampionTier": 4,
          "GoldPerStage": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/SubscriptionService_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Subscription Service",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Distancing3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat with no adjacent allies gain a @MaxHealthShield@% max Health shield for @ShieldDuration@ seconds.",
      "effects": {
          "MaxHealthShield": 50,
          "ShieldDuration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Exiles3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Exiles III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Distancing2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat with no adjacent allies gain a @MaxHealthShield@% max Health shield for @ShieldDuration@ seconds.",
      "effects": {
          "MaxHealthShield": 35,
          "ShieldDuration": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Exiles2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Exiles II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OnARoll",
      "associatedTraits": [],
      "composition": [],
      "desc": "Whenever you star up a champion, gain up to @TurnLimit@ free Shop rerolls per round. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "TurnLimit": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/On-a-Roll-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "On a Roll",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Reinfourcement",
      "associatedTraits": [],
      "composition": [],
      "desc": "The next 4-cost champion you buy is instantly upgraded to 2-star. Get&nbsp;@Gold@&nbsp;gold.",
      "effects": {
          "Gold": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Reinfourcement_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "ReinFOURcement",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Weakspot",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units' attacks ignore @ArmorPenPercent@% of the target's Armor and reduce healing received by @HealReductionPercent@% for @Duration@ seconds.",
      "effects": {
          "ArmorPenPercent": 10,
          "Duration": 3,
          "HealReductionPercent": 50
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Weakspot1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Weakspot",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_EscortQuest",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Training Dummy. You gain @Gold@ gold every time it survives player combat.",
      "effects": {
          "Gold": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Escort-Quest-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Escort Quest",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Sleightofhand",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Thief's Gloves. Champions holding this item gain @Health@ Health and @AS@% Attack Speed.",
      "effects": {
          "AS": 20,
          "Health": 100
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Sleight-of-Hand-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Sleight of Hand",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_ScopedWeapons1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the back 2 rows gain +@HexRangeIncrease@ Attack Range and @AS*100@% Attack Speed.",
      "effects": {
          "AS": 0.15000000596046448,
          "HexRangeIncrease": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ScopedWeapons2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Scoped Weapons",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Placebo",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your team gains @AttackSpeed*100@% Attack Speed.",
      "effects": {
          "AttackSpeed": 0.019999999552965164,
          "Gold": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Placebo_I.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Placebo",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TrueTwos",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random 2-star Tier 1 champion and a random 2-star Tier 2 champion.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/True-Twos-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "True Twos",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_DoubleDown",
      "associatedTraits": [],
      "composition": [],
      "desc": "After each player combat, gain gold equal to the length of your win or loss streak (max @GoldMax@ gold). ",
      "effects": {
          "GoldMax": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/DoubleDown_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Double Down",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TransfusionPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 40,
          "BonusHPPerMissingHealth": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion II",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_GoodForSomething",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions that aren't holding items have a @dropchance*100@% to drop @Gold@ gold on death.",
      "effects": {
          "DropChance": 0.5,
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Good-For-Something-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Good For Something II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_PandorasRadiantBox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized. <br><br>Gain 1 random Radiant item.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TacticiansTools",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumSpatulas@ Spatulas and @NumItemAnvils@ component anvil.",
      "effects": {
          "NumItemAnvils": 1,
          "NumSpatulas": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tactician_s-Tools-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tactician's Tools",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_TradeSector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll every round. Gain @Gold@ gold.",
      "effects": {
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Trade2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trade Sector",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_Pilfer",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each round, gain a 1-star copy of the first champion you killed last combat.",
      "effects": {
          "Gold": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pilfer_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pilfer",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AirspeedVelocity2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @AttackSpeed*100@% Attack Speed.",
      "effects": {
          "AttackSpeed": 0.550000011920929
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Unladen-Airspeed-Velocity-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unburdened II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BigGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random components, @Gold@ gold, and 1 Reforger. <br><br><rules>Reforgers allow you to remake any item.</rules>",
      "effects": {
          "Gold": 2,
          "NumItems": 3,
          "NumReforgers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Grab-Bag-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Big Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BardPlaybook2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a component anvil when you reach level @levelreqa@, @levelreqb@, @levelreqc@, and @levelreqd@.<br><br><rules>The anvil offers 4 choices.</rules>",
      "effects": {
          "levelreqa": 5,
          "levelreqb": 6,
          "levelreqc": 7,
          "levelreqd": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Favor",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Battlemage1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @Armor@ Armor and @AP@ Ability Power.",
      "effects": {
          "AP": 15,
          "Armor": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battlemage-I-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battlemage I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CelestialBlessing1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units heal for @Omnivamp@% of the damage dealt by attacks and Abilities. Excess healing is converted to a shield up to @MaxShield@ Health.",
      "effects": {
          "MaxShield": 200,
          "Omnivamp": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CelestialBlessing1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Celestial Blessing I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BardPlaybook3",
      "associatedTraits": [],
      "composition": [],
      "desc": "As you level, gain more powerful items.<br>Level @levelreqa@: component anvil<br>Level @levelreqb@: completed item anvil<br>Level @levelreqc@: choose 1 of 5 Radiant items",
      "effects": {
          "levelreqa": 4,
          "levelreqb": 6,
          "levelreqc": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Chosen",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_AirspeedVelocity1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units without items equipped gain @AttackSpeed*100@% Attack Speed.",
      "effects": {
          "AttackSpeed": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Unladen-Airspeed-Velocity-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Unburdened I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CelestialBlessing2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units heal for @Omnivamp@% of the damage dealt by attacks and Abilities. Excess healing is converted to a shield up to @MaxShield@ Health.",
      "effects": {
          "MaxShield": 300,
          "Omnivamp": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CelestialBlessing2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Celestial Blessing II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Battlemage3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @Armor@ Armor and @AP@ Ability Power.",
      "effects": {
          "AP": 35,
          "Armor": 35
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battlemage-III-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battlemage III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_GachaAddict",
      "associatedTraits": [],
      "composition": [],
      "desc": "Each time your Shop is rerolled, you have a @RerollPercent@% chance to gain a free reroll.",
      "effects": {
          "RerollPercent": 45
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldenTicket3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Prismatic Ticket",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CelestialBlessing3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units heal for @Omnivamp@% of the damage dealt by attacks and Abilities. Excess healing is converted to a shield up to @MaxShield@ Health.",
      "effects": {
          "MaxShield": 400,
          "Omnivamp": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CelestialBlessing3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Celestial Blessing III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BardPlaybook1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random @UnitTier@-cost champion now. Gain the same one again every time you level up.",
      "effects": {
          "UnitTier": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Ally",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Battlemage2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @Armor@ Armor and @AP@ Ability Power.",
      "effects": {
          "AP": 25,
          "Armor": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battlemage-II-A.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battlemage II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ReinforcedRejuvenation2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team has @StatOmnivamp*100@% Omnivamp, increased by @BonusVampPer*100@% for every champion that starts combat in that same row.",
      "effects": {
          "BonusVampPer": 0.014999999664723873,
          "StatOmnivamp": 0.10000000149011612
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Row Rejuvenation II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CalculatedLoss",
      "associatedTraits": [],
      "composition": [],
      "desc": "After losing your combat, gain @Gold@ gold and a free Shop reroll.",
      "effects": {
          "Gold": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CalculatedLoss2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Calculated Loss",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticLeech3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions holding an item gain @health@ Health and @omnivamp@% Omnivamp.",
      "effects": {
          "Health": 250,
          "Omnivamp": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Leech-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Leech III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BalancedBudget2",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @gold@ gold.",
      "effects": {
          "Gold": 7,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Balanced-Budget-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Balanced Budget",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_RiskyMoves",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tactician loses @Health@ Health, but after @PlayerCombatNum@ player combats, gain @Gold@ gold.",
      "effects": {
          "Gold": 33,
          "Health": 20,
          "PlayerCombatNum": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Risky-Moves-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Risky Moves",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ForceOfNature",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain +@MaxArmySizeIncrease@ max team size and a Champion Duplicator.",
      "effects": {
          "MaxArmySizeIncrease": 1,
          "{4a99a5b2}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/NewRecruit3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "New Recruit",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticLeech2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions holding an item gain @health@ Health and @omnivamp@% Omnivamp.",
      "effects": {
          "Health": 120,
          "Omnivamp": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Leech-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Leech II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_CyberneticLeech1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Champions holding an item gain @health@ Health and @omnivamp@% Omnivamp.",
      "effects": {
          "Health": 80,
          "Omnivamp": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Leech-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Leech I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ReinforcedRejuvenation1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team has @StatOmnivamp*100@% Omnivamp, increased by @BonusVampPer*100@% for every champion that starts combat in that same row.",
      "effects": {
          "BonusVampPer": 0.009999999776482582,
          "StatOmnivamp": 0.07999999821186066
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Row Rejuvenation I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_AvengeTheFallen",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @NumDeaths@ allies die, your team gains @AD@% Attack Damage, @ap@ Ability Power, @Armor@ Armor, and @MR@ Magic Resist. <br>",
      "effects": {
          "AD": 30,
          "AP": 30,
          "Armor": 30,
          "MR": 30,
          "NumDeaths": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Avenge-The-Fallen-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Avenge The Fallen",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_KnowledgeIsPower",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Tome of Traits and a component anvil.",
      "effects": {
          "NumTomes": 1,
          "anvils": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Knowledge-is-Power-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Library Card",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BandOfThieves1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumGloves@ Thief's Gloves.",
      "effects": {
          "NumGloves": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/BandThieves1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Band of Thieves I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BalancedBudgetPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @gold@ gold.",
      "effects": {
          "Gold": 9,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Balanced-Budget-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Balanced Budget+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GreaterJeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @critchance@% Critical Strike chance, and their Abilities can critically strike.",
      "effects": {
          "CritChance": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus III",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_LivingForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil now and after every @NumberOfCombats@ player combats.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Living-Forge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Living Forge",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_WanderingTrainerSilver",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold and a Training Dummy with @NumOfEmblems@ permanently attached Emblems.",
      "effects": {
          "Gold": 1,
          "NumOfEmblems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Wandering-Trainer-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Wandering Trainer I",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_RestartMissionPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Delete all champions on your board and bench. Gain a random 2-star 4-cost, two 2-star 3-cost,  two 2-star 2-cost, and 2-star 1-cost champion.",
      "effects": {
          "NumUnits": 2,
          "Tier": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Restart Mission +",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MeleeStarBlade3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @ADPerStarLevel*100@% Attack Damage.",
      "effects": {
          "ADPerStarLevel": 0.550000011920929
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CQCTraining3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knife's Edge III",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Common_ExampleAug",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. Gain another @BonusHPPer5MissingHealth@ Health and @OmnivampPercentPer5MissingHealth*100@% Omnivamp per 5 missing player health.<br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "{c56ea2ab}": 20
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vampirism I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MeleeStarBlade2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @ADPerStarLevel*100@% Attack Damage.",
      "effects": {
          "ADPerStarLevel": 0.3499999940395355
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CQCTraining2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knife's Edge II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Windfall",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @AugmentGold@ gold.",
      "effects": {
          "AugmentGold": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Windfall3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Windfall",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OverwhelmingForce",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Deathblade, an Infinity Edge, a BF Sword, and a Magnetic Remover.<br><br><rules>Useful for Attack Carries or Attack Fighters!</rules>",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Eagle-Eye-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Overwhelming Force",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_MeleeStarBlade1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat in the front 2 rows gain @ADPerStarLevel*100@% Attack Damage.",
      "effects": {
          "ADPerStarLevel": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CQCTraining1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knife's Edge I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_RadiantRelics",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Radiant items. Gain a Magnetic Remover.<br><br><rules>Radiant items are very powerful versions of completed items.</rules>",
      "effects": {
          "ArmoryChoiceCount": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RadiantRelic-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Radiant Relics",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_BigFriend2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units that start combat next to a unit with over @RequiredHealth@ Health take @DamageReductionPercent@% less damage for the rest of combat.",
      "effects": {
          "DamageReductionPercent": 10,
          "RequiredHealth": 1600
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Big-Friend-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Big Friend II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_SupportSentinel2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumOfDummies@ Golem that fights for your team, holding @NumOfItems@ permanently attached Support item(s).",
      "effects": {
          "NumOfDummies": 1,
          "NumOfItems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Support-Sentinel-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Support Golem II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Twins1",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusStats@% Attack Damage and @BonusStats@ Ability Power, Armor, and Magic Resist. When you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusStats": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Double-Trouble-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Double Trouble I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_FuturePeepers2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Know who you will fight next. Gain a Radiant Zephyr.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Future-Sight-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Future Sight II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_KnowYourEnemy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team deals @BaseDamageAmp@% more damage.<br><br>Deal @FullDamageAmp@% more damage instead if you and your opponent have any of the same traits active.",
      "effects": {
          "BaseDamageAmp": 10,
          "FullDamageAmp": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Know-Your-Enemy-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Know Your Enemy",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Featherweights1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 1 and 2 champions gain @AttackSpeed@% Attack Speed and Move Speed.",
      "effects": {
          "AttackSpeed": 15,
          "MoveSpeed": 350
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Featherweights1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Featherweights I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_SilverVeil",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BonusAS*100@% Attack Speed and is immune to the first crowd control effect in combat.",
      "effects": {
          "BonusAS": 0.05000000074505806
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/The-Silver-Veil-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silver Veil",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Twins2",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusStats@% Attack Damage and @BonusStats@ Ability Power, Armor, and Magic Resist. When you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusStats": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Double-Trouble-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Double Trouble II",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_ImTheCarryNow",
      "associatedTraits": [],
      "composition": [],
      "desc": "Get a Sentinel with tailored offensive items. It gets stronger at the start of each Stage.",
      "effects": {
          "{2d6883d7}": 0.20000000298023224,
          "{8715634f}": 475,
          "{92c6e7f9}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ImtheCarrynow_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "I'm The Carry Now",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BuildingACollectionPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Twins3",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you field exactly 2 copies of a champion, they both gain @BonusStats@% Attack Damage and @BonusStats@ Ability Power, Armor, and Magic Resist. When you 3-star, gain a 2-star copy.",
      "effects": {
          "BonusStats": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Double-Trouble-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Double Trouble III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Featherweights3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 1 and 2 champions gain @AttackSpeed@% Attack Speed and Move Speed.",
      "effects": {
          "AttackSpeed": 50,
          "MoveSpeed": 700
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Featherweights3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Featherweights III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_ThreesCompany",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumChamps@ random 3-cost champions.",
      "effects": {
          "NumChamps": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Threes-Company-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Three's Company",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TonsOfStats",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @Health@ Health, @AttackDamage@% Attack Damage, @AbilityPower@ Ability Power, @Armor@ Armor, @MR@ Magic Resist, @AttackSpeed@% Attack Speed, and @Mana@ Mana.",
      "effects": {
          "AbilityPower": 4,
          "Armor": 4,
          "AttackDamage": 4,
          "AttackSpeed": 4,
          "Health": 44,
          "MR": 4,
          "Mana": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tons-of-Stats-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tons of Stats!",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_FineVintage",
      "associatedTraits": [],
      "composition": [],
      "desc": "Completed items left on your bench for @Rounds@ rounds transform into Support&nbsp;Anvils.",
      "effects": {
          "rounds": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FineVintage_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Fine Vintage",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Featherweights2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your Tier 1 and 2 champions gain @AttackSpeed@% Attack Speed and Move Speed.",
      "effects": {
          "AttackSpeed": 30,
          "MoveSpeed": 550
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Featherweights2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Featherweights II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_FirstAidKit",
      "associatedTraits": [],
      "composition": [],
      "desc": "All healing and shielding on your units is increased by @HealShieldIncrease*100@%.",
      "effects": {
          "HealShieldIncrease": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/FirstAidKit1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "First Aid Kit I",
      "unique": false
  },
  {
      "apiName": "TFT10_Augment_VampirismPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseHP@ Health. Gain another @BonusHPPer5MissingHealth@ Health and @OmnivampPercentPer5MissingHealth*100@% Omnivamp per 5 missing player health.<br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "BaseHP": 50,
          "BonusHPPer5MissingHealth": 6,
          "OmnivampPercentPer5MissingHealth": 0.009999999776482582
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Vampirism-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Vampirism II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TiniestTitanPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Heal@ player health and @Gold@ gold after every player combat. Your Tactician also moves faster.<br><br>Gain @InitialGold@ gold now.",
      "effects": {
          "Gold": 2,
          "Heal": 2,
          "InitialGold": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiniest-TitanIII.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiniest Titan+",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_FinalReserves",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first time you would be eliminated, you instead remain alive. After this happens, gain @xp@ XP and set your gold to @gold@. Excess gold is converted to XP.",
      "effects": {
          "Gold": 50,
          "XP": 70,
          "{9652277e}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Final-Reserves-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Final Reserves",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_PickOfTheLitter",
      "associatedTraits": [],
      "composition": [],
      "desc": "Open a special Shop with 3 free @ChampionTier@-cost champions. You can only pick 1, but you get @NumCopies@ copies of it.",
      "effects": {
          "ChampionTier": 3,
          "NumCopies": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PickOfTheLitter_I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pick of the Litter",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_AssassinsToolbox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Prowler's Claw and an Infinity Edge.",
      "effects": {
          "CombatNum": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AssassinsToolbox_III.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Assassin's Toolbox",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_PartialAscension",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @Delay@ seconds of combat, your units gain @DamageAmp@% Damage Amp.",
      "effects": {
          "DamageAmp": 30,
          "Delay": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Ascension1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Partial Ascension",
      "unique": false
  },
  {
      "apiName": "TFT_Augment_CategoryFive",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Runaan's Hurricane. Your Runaan's Hurricanes shoot @additionalbolts@ extra bolts, each dealing @TotalDamage*100@% of the original damage.",
      "effects": {
          "AS": "null",
          "TotalDamage": 0.8999999761581421,
          "additionalbolts": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/CategoryFive_II.TFT_Set12.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Category Five",
      "unique": false
  },
  {
      "apiName": "TFT11_Augment_Epoch",
      "associatedTraits": [],
      "composition": [],
      "desc": "Now, and at the start of every stage, gain @XP@ XP and @Rerolls@ free rerolls.",
      "effects": {
          "Rerolls": 2,
          "XP": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Epoch_II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Epoch",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Harmacist1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team has @Omnivamp@% Omnivamp and converts @Conversion@% of excess healing to true damage on their next attack.<br><br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "Conversion": 20,
          "Omnivamp": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Harmacist-1-2-3-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Harmacist I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_HealingOrbsII",
      "associatedTraits": [],
      "composition": [],
      "desc": "When an enemy dies, the nearest ally is healed for @Heal@.",
      "effects": {
          "Heal": 450
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Healing-Orbs-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Healing Orbs II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Bloodlust1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions permanently gain @AD*100@% Attack Damage every time they kill an enemy. Champions start with @StartingAD*100@% bonus Attack Damage.",
      "effects": {
          "AD": 0.009999999776482582,
          "StartingAD": 0.07999999821186066
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Combat-Training-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Combat Training",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Harmacist2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team has @Omnivamp@% Omnivamp and converts @Conversion@% of excess healing to true damage on their next attack.<br><br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "Conversion": 25,
          "Omnivamp": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Harmacist-1-2-3-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Harmacist II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_PandorasItems",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized. <br><br>Gain @NumComponents@ random component.",
      "effects": {
          "NumComponents": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_PortableForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Artifacts.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "ArmoryChoiceCount": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PortableForge2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portable Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Harmacist3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team has @Omnivamp@% Omnivamp and converts @Conversion@% of excess healing to true damage on their next attack.<br><br><rules>(Omnivamp: healing for a percent of damage dealt)</rules>",
      "effects": {
          "Conversion": 30,
          "Omnivamp": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Harmacist-1-2-3-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Harmacist III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_OldMansWalkingStick",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a Needlessly Large Rod. Your units gain @AP@ Ability Power.",
      "effects": {
          "AP": 18
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Old-Man_s-Walking-Stick-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Magic Wand",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_LongTimeCrafting",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @NumberOfCombats@ player combats, gain an Artifact anvil. <br><br><rules>The anvil offers 4 choices. Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Long-time-Crafting-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Latent Forge",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticUplink1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and restore @ManaRegen@ Mana per second.",
      "effects": {
          "Health": 80,
          "ManaRegen": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Uplink-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Uplink I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BloodMoney",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold per @HealthPerGold@ Health your Tactician loses.",
      "effects": {
          "Gold": 3,
          "HealthPerGold": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Blood-Money-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Blood Money",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticUplink2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and restore @ManaRegen@ Mana per second.",
      "effects": {
          "Health": 120,
          "ManaRegen": 2.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Uplink-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Uplink II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_CyberneticUplink3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your champions holding an item gain @Health@ Health and restore @ManaRegen@ Mana per second.",
      "effects": {
          "Health": 200,
          "ManaRegen": 3.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cybernetic-Uplink-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cybernetic Uplink III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TwoHealthy",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @HealthPerUnit@ Health for each unique @Tier@-cost champion on your board.",
      "effects": {
          "HealthPerUnit": 80,
          "Tier": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Two-Healthy-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Two Healthy",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_FuturePeepers",
      "associatedTraits": [],
      "composition": [],
      "desc": "Know who you will fight next. Gain a Zephyr.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Future-Sight-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Future Sight I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TeamingUp3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ Support Anvil, @NumComponents@ random component, and @NumUnits@ random Tier 4 champions.",
      "effects": {
          "NumComponents": 1,
          "NumItems": 1,
          "NumUnits": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Teaming-Up-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Teaming Up III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ItemGrabBagPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumFullItems@ random completed items and @Gold@ Gold.",
      "effects": {
          "Gold": 4,
          "NumFullItems": 2,
          "NumItems": "null",
          "NumReforgers": "null",
          "NumRemovers": "null",
          "{466ef38d}": "null",
          "{4a99a5b2}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemGrabBag3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Grab Bag III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_StarsAreBorn",
      "associatedTraits": [],
      "composition": [],
      "desc": "The first 1-cost and 2-cost champions you buy are instantly upgraded to 2-star. Gain @Gold@ gold.",
      "effects": {
          "Gold": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Stars-are-born-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Stars are Born",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_HighEndSector",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you level up, gain a number of free shop refreshes equal to your level. Gain @gold@ gold. ",
      "effects": {
          "Gold": 4,
          "{a9ad6d1b}": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Trade3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Shopping Spree",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BuildingACollectionPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_TomeOfTraits1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumTomes@ Tome of Traits and @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "NumTomes": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AncientArchives2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ancient Archives I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_MaxLevel10",
      "associatedTraits": [],
      "composition": [],
      "desc": "When you buy XP, gain an additional @XP@. Gain @InitialXP@ immediately.",
      "effects": {
          "InitialXP": 12,
          "XP": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/LevelUp3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Level Up!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_HedgeFund",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 22,
          "InterestCap": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Hedge Fund",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_FinalGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random component, @Gold@ gold, and a Reforger. ",
      "effects": {
          "Gold": 10,
          "NumItems": 1,
          "NumReforgers": 1,
          "NumRemovers": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Final-Grab-Bag-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Final Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_OneTwosThree",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @tier1champs@ 1-cost champion, @numchamps@ 2-cost champions, and 1 3-cost champion.",
      "effects": {
          "NumChamps": 2,
          "tier1champs": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Threes-Company-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ones Twos Three",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Legend_AFK",
      "associatedTraits": [],
      "composition": [],
      "desc": "You cannot perform actions for the next @RoundsToSkip@ rounds. Afterwards, gain @Gold@ gold.",
      "effects": {
          "Gold": 20,
          "RoundsToSkip": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AFK-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "AFK",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_RollingForDays3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Numrolls@ free Shop rerolls.",
      "effects": {
          "Numrolls": 25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Rolling-For-Days-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rolling For Days III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_RollingForDays2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Numrolls@ free Shop rerolls.",
      "effects": {
          "Numrolls": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Rolling-For-Days-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rolling For Days II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_Transfusion",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 20,
          "BonusHPPerMissingHealth": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ItPaysToLearn",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @XP@ XP and @Gold@ gold. ",
      "effects": {
          "Gold": 8,
          "XP": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/It-Pays-To-Learn-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "It Pays To Learn",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_GreaterJeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @critchance@% Critical Strike chance, and their Abilities can critically strike.",
      "effects": {
          "CritChance": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_DravenSpoilsOfWar",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.25,
          "{ac7ef35a}": 0.25
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TinyGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random component, @Gold@ gold, a Magnetic Remover. ",
      "effects": {
          "Gold": 2,
          "NumFullItems": "null",
          "NumItems": 1,
          "NumReforgers": "null",
          "NumRemovers": 1,
          "{466ef38d}": "null",
          "{4a99a5b2}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Grab-Bag-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_PandorasRadiantBox",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized. <br><br>Gain 1 random Radiant item.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_TransfusionPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 40,
          "BonusHPPerMissingHealth": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion II",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_TinyTitans",
      "associatedTraits": [],
      "composition": [],
      "desc": "Increase your current and max player health by @heal@.",
      "effects": {
          "Heal": 30
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiny-Titans-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Titans",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_SmallForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a component anvil and @gold@ gold.",
      "effects": {
          "Gold": 2,
          "anvils": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Forge-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Small Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_MediumForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a completed item anvil and @gold@ gold.",
      "effects": {
          "Gold": 1,
          "NumItems": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Forge-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Medium Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_LargeForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil and a component item anvil.",
      "effects": {},
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Forge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Large Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_WellEarnedComforts",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @Health@ Health for each item equipped.",
      "effects": {
          "Health": 70
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Well-Earned-Comforts-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Well-Earned Comforts I",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_PortableForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Choose 1 of @ArmoryChoiceCount@ Artifacts.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "ArmoryChoiceCount": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/PortableForge2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Portable Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_StarterKit",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a 4-cost champion, a 2-star 1-cost champion that shares a trait with them, and @Gold@ gold.<br><br>At the start of the next @FutureChampionCount@ stages, gain that 4-cost champion again.",
      "effects": {
          "FutureChampionCount": 2,
          "Gold": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Starter-Kit-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Starter Kit",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_CuttingCorners",
      "associatedTraits": [],
      "composition": [],
      "desc": "Leveling up costs @Experience@ XP less.",
      "effects": {
          "Experience": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Cutting-Corners-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Cutting Corners",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ItPaysToLearnII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @XP@ XP and @Gold@ gold. ",
      "effects": {
          "Gold": 12,
          "XP": 16
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/It-Pays-To-Learn-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "It Pays to Learn II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Legend_LivingForge",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil now and after every @NumberOfCombats@ player combats.<br><br><rules>Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Living-Forge-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Living Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BalancedBudget",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @gold@ gold.",
      "effects": {
          "Gold": 4,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Balanced-Budget-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Balanced Budget",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BranchingOut",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random Emblem and a Reforger.<br><br><rules>Reforgers allow you to remake any item.</rules>",
      "effects": {
          "Numberofcombats": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Branching-Out-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Branching Out",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TopDeckPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold and a Champion Duplicator. ",
      "effects": {
          "Gold": 24,
          "{4a99a5b2}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Training-Reward-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Training Reward III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_TiniestTitan",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Heal@ player health and @Gold@ gold after every player combat. Your Tactician also moves faster.",
      "effects": {
          "Gold": 2,
          "Heal": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiniest-TitanIII.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiniest Titan",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GottaGoFast",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team creates @PercentMana@% more Mana and moves @BonusMovementSpeed@% faster.",
      "effects": {
          "BonusMovementSpeed": 35,
          "PercentMana": 10,
          "{c90c2591}": 300
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gotta-Go-Fast-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gotta Go Fast!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_SmallForgePlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @anvils@ component anvil and @RandomComponents@ random component.",
      "effects": {
          "RandomComponents": 1,
          "anvils": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Job_s-Done-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Job's Done",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GottaGoFastIII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team creates @PercentMana@% more Mana and moves @BonusMovementSpeed@% faster.",
      "effects": {
          "BonusMovementSpeed": 100,
          "PercentMana": 30,
          "{c90c2591}": 750
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gotta-Go-Fast-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gotta Go Fast!!! III",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_PandorasItems",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized. <br><br>Gain @NumComponents@ random component.",
      "effects": {
          "NumComponents": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_PumpingUp2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp2Rounds@%)",
      "effects": {
          "BaseAS": 10,
          "IncreasePerRound": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_PandorasItems2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Round start: items on your bench are randomized.<br><br>Gain @NumComponents@ random components.",
      "effects": {
          "NumCompletedItems": "null",
          "NumComponents": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pandora's Items II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_PumpingUp3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUp3Rounds@%)",
      "effects": {
          "BaseAS": 12,
          "IncreasePerRound": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ItPaysToLearnIII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @XP@ XP and @Gold@ gold. ",
      "effects": {
          "Gold": 16,
          "XP": 24
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/It-Pays-To-Learn-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "It Pays to Learn III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BardPlaybook1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random @UnitTier@-cost champion now. Gain the same one again every time you level up.",
      "effects": {
          "UnitTier": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Ally",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BardPlaybook3",
      "associatedTraits": [],
      "composition": [],
      "desc": "As you level, gain more powerful items.<br>Level @levelreqa@: component anvil<br>Level @levelreqb@: completed item anvil<br>Level @levelreqc@: choose 1 of 5 Radiant items",
      "effects": {
          "levelreqa": 4,
          "levelreqb": 6,
          "levelreqc": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Chosen",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BardPlaybook2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a component anvil when you reach level @levelreqa@, @levelreqb@, @levelreqc@, and @levelreqd@.<br><br><rules>The anvil offers 4 choices.</rules>",
      "effects": {
          "levelreqa": 5,
          "levelreqb": 6,
          "levelreqc": 7,
          "levelreqd": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Caretaker_s-Chosen-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Caretaker's Favor",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_RichGetRicher",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold. Your max interest is increased to @InterestCap@.<br><br><rules>Interest is extra gold you gain per 10g saved.</rules>",
      "effects": {
          "Gold": 12,
          "InterestCap": 7
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RichGetRicher2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Rich Get Richer",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BuildingACollectionPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BuildingACollection",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random item component at the start of the next @roundsofbonusitems@ rounds (including this round).",
      "effects": {
          "Gold": "null",
          "roundsofbonusitems": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Buried-Treasures-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Buried Treasures I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_LongTimeCrafting",
      "associatedTraits": [],
      "composition": [],
      "desc": "After @NumberOfCombats@ player combats, gain an Artifact anvil. <br><br><rules>The anvil offers 4 choices. Artifacts are more powerful items with a unique effect.</rules>",
      "effects": {
          "Numberofcombats": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Long-time-Crafting-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Latent Forge",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GottaGoFastII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team creates @PercentMana@% more Mana and moves @BonusMovementSpeed@% faster.",
      "effects": {
          "BonusMovementSpeed": 60,
          "PercentMana": 20,
          "{c90c2591}": 450
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Gotta-Go-Fast-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Gotta Go Fast! II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TopDeck",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold and a Lesser Champion Duplicator.",
      "effects": {
          "Gold": 5,
          "LesserDuplicatorAmount": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Training-Reward-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Training Reward",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_FinalGrabBagPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random components, @Gold@ gold, and a Magnetic Remover. ",
      "effects": {
          "Gold": 12,
          "NumItems": 2,
          "NumReforgers": "null",
          "NumRemovers": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Final-Grab-Bag-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Final Grab Bag II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BattleReadyII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team deals @BonusDamage@% more damage and takes @DR@% less damage. ",
      "effects": {
          "BonusDamage": 6,
          "DR": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battle-Ready-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battle Ready II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BalancedBudget3",
      "associatedTraits": [],
      "composition": [],
      "desc": "At the start of the next @rounds@ rounds, gain @gold@ gold.",
      "effects": {
          "Gold": 11,
          "rounds": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Balanced-Budget-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Balanced Budget III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Money",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold. In @Numberofcombats@ turns, gain @gold@ gold again.",
      "effects": {
          "Gold": 11,
          "Numberofcombats": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Money-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Money!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_LesserJeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Combat start: Your strongest unit gains @CritChance@% Critical Strike Chance and their abilities can critically strike.",
      "effects": {
          "CritChance": 40
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 22
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Knowledge-Download-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 36
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Knowledge-Download-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BattleReady",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team deals @BonusDamage@% more damage and takes @DR@% less damage. ",
      "effects": {
          "BonusDamage": 3,
          "DR": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battle-Ready-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battle Ready",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Experience1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Experience@ XP.",
      "effects": {
          "Experience": 12
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Knowledge-Download-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Knowledge Download I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_BronzeTicket",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll after every @RollNumber@ rerolls. Gain @Gold@ gold.",
      "effects": {
          "Gold": 3,
          "RollNumber": 4
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/GoldenTicket1.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Silver Ticket",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_FinalGrabBagPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random components, a Champion Duplicator, and a Spatula. ",
      "effects": {
          "Gold": "null",
          "NumItems": 2,
          "NumReforgers": "null",
          "NumRemovers": "null",
          "{466ef38d}": 1,
          "{4a99a5b2}": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Final-Grab-Bag-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Urf's Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_MetabolicAccelerator",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Heal@ player health after every player combat. Your Tactician also moves faster.",
      "effects": {
          "Heal": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/MetabolicAccel2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Metabolic Accelerator",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_LearningFromExperience2",
      "associatedTraits": [],
      "composition": [],
      "desc": "After player combat, gain @winxp@ XP if you won or @lossxp@ XP if you lost.",
      "effects": {
          "lossxp": 3,
          "winxp": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Learning-From-Experience-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Patient Study",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_MediumForgePlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a completed item anvil and @RandomComponents@ random component.",
      "effects": {
          "NumAnvils": 1,
          "RandomComponents": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Job_s-Done-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Job Well Done",
      "unique": false
  },
  {
      "apiName": "TFT6_Augment_Legend_TradeSector",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a free Shop reroll every round. Gain @Gold@ gold.",
      "effects": {
          "Gold": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Trade2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Trade Sector",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_BattleReadyIII",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team deals @BonusDamage@% more damage and takes @DR@% less damage. ",
      "effects": {
          "BonusDamage": 8,
          "DR": 8
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Battle-Ready-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Battle Ready III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_GiantGrabBag",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumItems@ random components, @Gold@ gold, and a Lesser Champion Duplicator. ",
      "effects": {
          "Gold": 4,
          "LesserDuplicatorAmount": 1,
          "NumItems": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Grab-Bag-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Giant Grab Bag",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_DravenSpoilsOfWar2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.30000001192092896,
          "{ac7ef35a}": 0.30000001192092896
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_DravenSpoilsOfWar3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Enemies have a @LootDropChance*100@% chance to drop loot when killed.",
      "effects": {
          "LootDropChance": 0.4000000059604645,
          "{ac7ef35a}": 0.4000000059604645
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Spoils-Of-War-Legend-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Spoils of War III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TinyPower1",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @ap@% Attack Damage, Ability Power, and Attack Speed.",
      "effects": {
          "AD": 6,
          "AP": 6,
          "AS": 6
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiny-Power-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Power I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TinyPower3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @ap@% Attack Damage, Ability Power, and Attack Speed.",
      "effects": {
          "AD": 15,
          "AP": 15,
          "AS": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiny-Power-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Power III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_TinyPower2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @ap@% Attack Damage, Ability Power, and Attack Speed.",
      "effects": {
          "AD": 10,
          "AP": 10,
          "AS": 10
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Tiny-Power-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Tiny Power II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_JeweledLotus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @critchance@% Critical Strike chance, and their Abilities can critically strike.",
      "effects": {
          "CritChance": 15
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Jeweled-Lotus-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Jeweled Lotus II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Money2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold. In @Numberofcombats@ turns, gain @gold@ gold again.",
      "effects": {
          "Gold": 16,
          "Numberofcombats": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Money-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Money Money!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_LargeForgePlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain an Artifact anvil and a completed item anvil.",
      "effects": {
          "Gold": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Job_s-Done-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Masterful Job",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_Money3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @gold@ gold. In @Numberofcombats@ turns, gain @gold@ gold again.",
      "effects": {
          "Gold": 25,
          "Numberofcombats": 3
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Money-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Money Money Money!",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_TopDeckPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @Gold@ gold and a Lesser Champion Duplicator.",
      "effects": {
          "Gold": 12,
          "LesserDuplicatorAmount": 1
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Training-Reward-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Training Reward II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_ItemGrabBagPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain a random completed item, a random component, and @Gold@ gold. ",
      "effects": {
          "Gold": 1,
          "NumFullItems": 1,
          "NumItems": 1,
          "NumReforgers": "null",
          "NumRemovers": "null",
          "{466ef38d}": "null",
          "{4a99a5b2}": "null"
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/ItemGrabBag2.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Item Grab Bag II",
      "unique": false
  },
  {
      "apiName": "TFT7_Augment_Legend_TomeOfTraits2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Gain @NumTomes@ Tome of Traits and @Gold@ gold.",
      "effects": {
          "Gold": 5,
          "NumTomes": 2
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/AncientArchives3.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Ancient Archives II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_PumpingUp",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your team gains @BaseAS@% Attack Speed now. Each round after, they gain @IncreasePerRound@% more. (current Attack Speed: @TFTUnitProperty.item:TFT9_PumpingUpRounds@%)",
      "effects": {
          "BaseAS": 8,
          "IncreasePerRound": 0.5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pumping-Up-I.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Pumping Up I",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_WellEarnedComforts2",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @Health@ Health for each item equipped.",
      "effects": {
          "Health": 111
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Well-Earned-Comforts-II.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Well-Earned Comforts II",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Commander_WellEarnedComforts3",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @Health@ Health and @AttackSpeed*100@% Attack Speed for each item equipped.",
      "effects": {
          "AttackSpeed": 0.05999999865889549,
          "Health": 120
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Well-Earned-Comforts-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Well-Earned Comforts III",
      "unique": false
  },
  {
      "apiName": "TFT9_Augment_Legend_TransfusionPlusPlus",
      "associatedTraits": [],
      "composition": [],
      "desc": "Your units gain @BaseHP@ Health, plus @BonusHPPerMissingHealth@ Health per missing Tactician Health.",
      "effects": {
          "BaseHP": 50,
          "BonusHPPerMissingHealth": 5
      },
      "from": null,
      "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Transfusion-III.tex",
      "id": null,
      "incompatibleTraits": [],
      "name": "Transfusion III",
      "unique": false
  }
]