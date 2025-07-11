# 🚴‍♂️ IV Trilha Cicloturística do Marajó

**Visualizador interativo do percurso da IV Trilha Cicloturística do Marajó**, realizada nos dias **19 e 20 de julho** em **Salvaterra (PA)**. Desenvolvido para facilitar o acompanhamento do trajeto, pontos de apoio e perfil altimétrico.

![Banner do Evento](assets/banner.jpg)

## 🗺️ Funcionalidades

- Visualização do **percurso completo** com destaque para estrada de terra
- Marcação dos **pontos de apoio** nos km 10, 20 e 32
- Ícones personalizados para **largada** e **chegada**
- Perfil de **elevação interativo** ao longo da trilha
- Alternância entre múltiplas camadas base (Google Satélite, Relevo, OSM, CartoDB)

## 📁 Estrutura do Projeto

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

## 🚀 Como visualizar

Você pode abrir diretamente com [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code ou publicar a pasta no **GitHub Pages**:

1. Crie o repositório e envie todos os arquivos
2. Vá em **Settings > Pages**
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
4. Acesse via: `https://seu-usuario.github.io/nome-do-repositorio`

## 🔧 Tecnologias

- [Leaflet.js](https://leafletjs.com/) – para mapas interativos
- [Chart.js](https://www.chartjs.org/) – para perfil de elevação
- GeoJSON – como formato padrão dos dados geográficos

## 👤 Desenvolvido por

[Samuel Santos](https://samuel-c-santos.github.io/)  
Desenvolvedor e coordenador do Núcleo de Geotecnologias – IDEFLOR-Bio  
**Contato:** samuelcosta.eng@gmail.com

---

### 🌱 Viva o Marajó. Pedale com consciência.