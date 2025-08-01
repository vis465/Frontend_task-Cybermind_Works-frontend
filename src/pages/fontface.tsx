import { useFonts } from 'expo-font';

 export default function useSatoshiFont  ()  {
 const [fontsLoaded] = useFonts({
  'Satoshi': require('../assets/fonts/Satoshi.ttf'),
 });
 return fontsLoaded;
};