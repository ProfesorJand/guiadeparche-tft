export async function fetchingDataTFT({version, idioma, pais}){
    try {
        const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
        const fetching = await fetch(urlDragon, {cache:"reload"});
        const {items, sets} = await fetching.json();
        return {items, sets}
    } catch (error) {
        throw new Error('fetchingDataTFT');
    }
    
}

export const version = "latest";
export const idioma = "es"; //en
export const pais = "ar"; //mx /es /gb /us
export const set = "12";
const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
export const latestVersion = latestVersionLog[0]+"."+latestVersionLog[1];

export async function fetchingLatestVersionTFT(){
    const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
    const fetching = await fetch(urlDragon, {cache:"reload"});
    return await fetching.json();
}


export const datosTFT = await fetchingDataTFT({version,idioma,pais});
export const championsTFT = await datosTFT.sets[set].champions;
export const itemsData = await datosTFT.items;

export const radiants = await itemsData.filter(({apiName})=>{
    return apiName.includes("Radiant")
}).map(({apiName, desc, effects, icon, name})=>{
    const src = `https://raw.communitydragon.org/latest/game/${icon.toLowerCase().replace(".tex",".png")}`;
    return {apiName, desc, effects, img:src, name}
})

export const emblems = await itemsData.filter(({apiName})=>{

    return apiName.includes("Emblem") && apiName.includes("TFT12") && !apiName.includes("Zap")
}).map(({apiName, desc, effects, icon, name})=>{
    const src = `https://raw.communitydragon.org/latest/game/${icon.toLowerCase().replace(".tex",".png")}`;
    return {apiName, desc, effects, img:src, name, sinergia:apiName.replace("TFT12_Item_","").replace("EmblemItem","")}
})


export const fetchMeta = await fetch(`https://guiadeparche.com/tftdata/Set${set}/metaTFTComposiciones.json`, {cache:"reload"});
export const meta = await fetchMeta.json();


export const augmentsIDList = [
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