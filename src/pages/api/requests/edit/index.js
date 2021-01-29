import { transformData } from "../utils/transformDataToRequest";
import { makeRequestEditClient, makeRequestEditNf, makeRequestEditOccurrence, makeRequestEditProduct } from "./editOccurrence";

export default function editOccurrence(oc) {
  const { product, locale, client, nfo, nfd, occurrence } = transformData(oc)
  const productResponse = makeRequestEditProduct(product).catch(err => console.error(err))
  const clientResponse = makeRequestEditClient(client).catch(err => console.error(err))
  const localeResponse = makeRequestEditLocale(locale).catch(err => console.error(err))
  const nfoResponse = makeRequestEditNf(nfo).catch(err => console.error(err))
  const nfdResponse = makeRequestEditNf(nfd).catch(err => console.error(err))
  const ocResponse = makeRequestEditOccurrence(occurrence).catch(err => console.error(err))

  return { productResponse, clientResponse, localeResponse, nfoResponse, nfdResponse, ocResponse }
}