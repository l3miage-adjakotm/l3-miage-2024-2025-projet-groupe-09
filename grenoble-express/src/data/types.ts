export interface Entrepot {
  jdds: readonly string[],
  nom: string,
  lettre: string,
  photo: string,
  adresse: string,
  code_postal: string,
  ville: string,
  latitude: number,
  longitude: number,
  camions: readonly string[],
  employes: readonly string[]
}
