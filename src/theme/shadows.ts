import type { Shadows } from '@mui/material/styles/shadows';

// El objeto Shadows exige 25 estilos de sombras, por ende se repitieron los estilo para
// cumplir con el requerimiento.
// boxShadow={0} => sin sombra
// boxShadow={1} => sombra por default
// boxShadow={2} => sombra en hover

export enum ShadowsEnum {
  None = 'none',
  Main = 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  Hover = 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
}

const shadowsTheme: Shadows = [
  ShadowsEnum.None,
  ShadowsEnum.Main,
  ShadowsEnum.Hover,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
  ShadowsEnum.None,
];

export default shadowsTheme;
