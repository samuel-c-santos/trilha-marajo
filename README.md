# 🚴‍♂️ IV Trilha Cicloturística do Marajó

**Visualizador interativo do percurso da IV Trilha Cicloturística do Marajó**, realizada nos dias **19 e 20 de julho** em **Salvaterra (PA)**. Desenvolvido para facilitar o acompanhamento do trajeto, pontos de apoio e perfil altimétrico.

![Banner do Evento](assets/banner.jpg)

## Funcionalidades

- Visualização do **percurso completo** com destaque para estrada de terra
- Marcação dos **pontos de apoio** nos km 10, 20 e 32
- Ícones personalizados para **largada** e **chegada**
- Perfil de **elevação interativo** ao longo da trilha
- Alternância entre múltiplas camadas base (Google Satélite, Relevo, OSM, CartoDB)

## Estrutura do Projeto

```

meu-percurso/
├── index.html
├── script.js
├── style.css
├── assets/
│   ├── banner.jpg
│   ├── logo.png
│   ├── saida.png
│   └── chegada.png
└── data/
├── percurso.geojson
├── pontos.geojson
├── pontos\_apoio.geojson
└── limites.geojson

```

## Como visualizar
[Acesse aqui](https://samuel-c-santos.github.io/trilha-marajo)  

## Tecnologias

- [Leaflet.js](https://leafletjs.com/) – para mapas interativos
- [Chart.js](https://www.chartjs.org/) – para perfil de elevação
- GeoJSON – como formato padrão dos dados geográficos

## Desenvolvido por

[Samuel Santos](https://samuel-c-santos.github.io/)  
Desenvolvedor e coordenador do Núcleo de Geotecnologias – IDEFLOR-Bio  
**Contato:** samuelsantosambiental@gmail.com

---

### 🌱 Viva o Marajó. Pedale com consciência.