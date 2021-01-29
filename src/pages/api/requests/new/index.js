import { transformData } from "../utils/transformDataToRequest";
import { makeRequestNewClient, makeRequestNewNf, makeRequestNewOccurrence, makeRequestNewProduct } from "./newOccurrence";

export default function NewOccurrence(oc) {
  const { product, locale, client, nfo, nfd, occurrence } = transformData(oc)
  const productResponse = makeRequestNewProduct(product).catch(err => console.error(err))
  const clientResponse = makeRequestNewClient(client).catch(err => console.error(err))
  const localeResponse = makeRequestNewLocale(locale).catch(err => console.error(err))
  const nfoResponse = makeRequestNewNf(nfo).catch(err => console.error(err))
  const nfdResponse = makeRequestNewNf(nfd).catch(err => console.error(err))
  const ocResponse = makeRequestNewOccurrence(occurrence).catch(err => console.error(err))
  
  return { productResponse, clientResponse, localeResponse, nfoResponse, nfdResponse, ocResponse }
}