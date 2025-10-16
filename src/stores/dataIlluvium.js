import { deepMap, task, atom } from "nanostores";
export const urlAumentos = "https://api.guiadeparche.com/illuvium/assets/aumentos/getList.php"
export const urlSuitsAmplifiers ="https://api.guiadeparche.com/illuvium/assets/suits_amplifiers/getList.php"
export const urlDronesAugments = "https://api.guiadeparche.com/illuvium/assets/drones_augments/getList.php"
export const urlClases = "https://api.guiadeparche.com/illuvium/assets/clases/getList.php"
export const urlElementos = "https://api.guiadeparche.com/illuvium/assets/elementos/getList.php"
export const urlWeapons = "https://api.guiadeparche.com/illuvium/assets/weapons/getList.php"
export const urlWeaponsAmplifiers = "https://api.guiadeparche.com/illuvium/assets/weapons_amplifiers/getList.php"
export const urlSaveMeta = "https://api.guiadeparche.com/illuvium/saveMeta.php";
export const urlGetMeta = "https://api.guiadeparche.com/illuvium/ComposMeta.json";
export const urlUploadsImg = "https://api.guiadeparche.com/illuvium/uploads/";
export const aumentosBasicos = deepMap([]);
export const aumentosLegendarios = deepMap([]);
export const suitsAmplifiers = deepMap([]);
export const dronesAugments = deepMap([]);
export const clases = deepMap([]);
export const elementos = deepMap([]);
export const weapons = deepMap([]);
export const weaponsAmplifiers = deepMap([]);
export const carpetaAumentos = ["basicos","legendarios"];
export const metaComps = deepMap([])
export const loading = deepMap(false)

export const getAugmentsList = async ({aumento})=>{
  // ejemplo: traer imágenes de la carpeta "basicos"
  const data = await fetch(`${urlAumentos}?carpeta=${aumento}`, {
    cache:"no-cache"
  })
  const res = await data.json();
  if(aumento === carpetaAumentos[0]){
    aumentosBasicos.set(res)
  }else if(aumento === carpetaAumentos[1]){
    aumentosLegendarios.set(res)
  }
}

export const getSuitAmplifiersList = async ()=>{
  const data = await fetch(`${urlSuitsAmplifiers}`,{cache:"no-cache"})
  const res = await data.json();
  suitsAmplifiers.set(res)
}

export const getDronesAugmentsList = async ()=>{
  const data = await fetch(`${urlDronesAugments}`,{cache:"no-cache"})
  const res = await data.json();
  dronesAugments.set(res)
}

export const getClases = async ()=>{
  const data = await fetch(`${urlClases}`,{cache:"no-cache"})
  const res = await data.json();
  console.log({clases:res})
  clases.set(res)
}

export const getElements = async ()=>{
  const data = await fetch(`${urlElementos}`,{cache:"no-cache"})
  const res = await data.json();
  console.log({elementos:res})
  elementos.set(res)
}

export const getWeapons= async ()=>{
  const data = await fetch(`${urlWeapons}`,{cache:"no-cache"})
  const res = await data.json();
  console.log({weapons})
  weapons.set(res)
}

export const getWeaponsAmplifiers = async ()=>{
  const data = await fetch(`${urlWeaponsAmplifiers}`,{cache:"no-cache"})
  const res = await data.json();
  weaponsAmplifiers.set(res)
}


export const guardarCompo = async(data) => {
  const formData = new FormData();

  // Datos simples
  formData.append("selectedTier", data.selectedTier);
  formData.append("nombreCompo", data.nombreCompo);
  formData.append("nombreBondPartner", data.nombreBondPartner);
  formData.append("selectedDificultad", data.selectedDificultad);
  formData.append("rollInLv", data.rollInLv);
  formData.append("elementoPartner", data.elementoPartner);
  formData.append("classPartner", data.classPartner);
  formData.append("classWeapon", data.classWeapon);
  formData.append("elementWeapon", data.elementWeapon);
  formData.append("weapon", data.weapon);
  formData.append("weaponAmplifier", data.weaponAmplifier);
  formData.append("earlyGame", data.earlyGame);
  formData.append("midGame", data.midGame);
  formData.append("lateGame", data.lateGame);
  formData.append("edit", data.edit ? "true" : "false");
  formData.append("id", data.id ?? "");

  // --- BondPartnerImg ---
  if (data.bondPartnerImg) {
    if (typeof data.bondPartnerImg === "string" && data.bondPartnerImg.startsWith("data:image")) {
      const cleanName = (data.nombreCompo || "bond_partner").replace(/\s+/g, "_");
      const file = dataURLtoFile(data.bondPartnerImg, `bond_partner_${cleanName}.png`);
      formData.append("bondPartnerImg", file);
    } else {
      formData.append("bondPartnerImgUrl", data.bondPartnerImg);
    }
  }

  // --- ImgPosicionamiento ---
  if (data.imgPosicionamiento) {
    if (typeof data.imgPosicionamiento === "string" && data.imgPosicionamiento.startsWith("data:image")) {
      const cleanName = (data.nombreCompo || "posicionamiento").replace(/\s+/g, "_");
      const file = dataURLtoFile(data.imgPosicionamiento, `posicionamiento_${cleanName}.png`);
      formData.append("imgPosicionamiento", file);
    } else {
      formData.append("imgPosicionamientoUrl", data.imgPosicionamiento);
    }
  }

  // --- Carries Itemization ---
  if (Array.isArray(data.carriesItemization)) {
    data.carriesItemization.forEach((img, i) => {
      if (!img) return;

      const imageString = Array.isArray(img) ? img[0] : img;

      if (typeof imageString === "string" && imageString.startsWith("data:image")) {
        const nombre = (`carry_${i + 1}`).replace(/\s+/g, "_");
        const file = dataURLtoFile(imageString, `carries_itemization_${nombre}.png`);
        formData.append(`carriesItemization[${i}]`, file);
      } else {
        formData.append(`carriesItemizationUrl[${i}]`, imageString);
      }
    });
  }

  // Múltiples arrays
  ["basicsAugments", "legendsAugments", "suitAmplifier", "droneAugment"].forEach(key => {
    if (Array.isArray(data[key])) {
      formData.append(`${key}`, JSON.stringify(data[key]));
    }
  });

  try {
    console.log("HACIENDO FETCH");
    loading.set(true);
    const res = await fetch(urlSaveMeta, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    alert("✅ Compo guardada:");
    loading.set(false);
  } catch (err) {
    console.error("❌ Error al guardar compo:", err);
    alert("❌ Error al guardar compo:", err.message);
    loading.set(false);
  }
};

function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}



export const getMetaComps = async()=>{
  const res = await fetch(urlGetMeta, {
    cache:"no-cache",
    
  })
  const data = await res.json();
  metaComps.set(data)
}