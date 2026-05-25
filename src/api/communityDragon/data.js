const TFT_VERSION = Object.freeze({
  LATEST:"latest",
  PBE:"pbe",
})

const LENGUAGES={
  cs_cz:"Czech (Czech Republic)",
  el_gr:"Greek (Greece)",
  pl_pl:"Polish (Poland)",
  ro_ro:"Romanian (Romania)",
  hu_hu:"Hungarian (Hungary)",
  en_gb:"English (United Kingdom)",
  de_de:"German (Germany)",
  es_es:"Spanish (Spain)",
  it_it:"Italian (Italy)",
  fr_fr:"French (France)",
  ja_jp:"Japanese (Japan)",
  ko_kr:"Korean (Korea)",
  es_mx:"Spanish (Mexico)",
  es_ar:"Spanish (Argentina)",
  pt_br:"Portuguese (Brazil)",
  en_us:"English (United States)",
  en_au:"English (Australia)",
  ru_ru:"Russian (Russia)",
  tr_tr:"Turkish (Turkey)",
  ms_my:"Malay (Malaysia)",
  en_ph:"English (Republic of the Philippines)",
  en_sg:"English (Singapore)",
  th_th:"Thai (Thailand)",
  vi_vn:"Vietnamese (Viet Nam)",
  id_id:"Indonesian (Indonesia)",
  zh_my:"Chinese (Malaysia)",
  zh_cn:"Chinese (China)",
  zh_tw:"Chinese (Taiwan)",
}

const TFT_DATA = async ({version=TFT_VERSION.PBE, lenguage="en_us"})=>{
  if(TFT_VERSION[version] && LENGUAGES[lenguage]){
    try{
      const TFT_URL_VERSION = `https://raw.communitydragon.org/${TFT_VERSION[version]}/cdragon/tft/${lenguage}.json`
      const response = await fetch(TFT_URL_VERSION,{cache:"reload"});
      const data = await response.json()
      return data
    }catch(err){
      throw Error("TFT_DATA error")
    }
  }
  return {}
}
