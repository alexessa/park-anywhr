import { Box } from "@mui/material";

const Maps = (props: any) => {
  const { center, zoom } = props;

  let map: google.maps.Map;

  async function initMap(): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: center,
      zoom: zoom,
    });
  }

  initMap();

  return <Box id="map"></Box>;
};

export default Maps;
