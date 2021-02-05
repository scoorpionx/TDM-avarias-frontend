import { getToken } from "../../auth";
import { transformData } from "./transformDataToRequest";
import { makeRequestEditClient, makeRequestEditLocale, makeRequestEditNf, makeRequestEditOccurrence, makeRequestEditProduct } from "./editOccurrence";

export default function editOccurrence(oc) {
  const { product, locale, client, nfo, nfd, occurrence } = transformData(oc)
  const productResponse = makeRequestEditProduct(product, getToken()).catch(err => console.error(err))
  const clientResponse = makeRequestEditClient(client, getToken()).catch(err => console.error(err))
  const localeResponse = makeRequestEditLocale(locale, getToken()).catch(err => console.error(err))
  const nfoResponse = makeRequestEditNf(nfo, getToken()).catch(err => console.error(err))
  const nfdResponse = makeRequestEditNf(nfd, getToken()).catch(err => console.error(err))
  const ocResponse = makeRequestEditOccurrence(occurrence, getToken()).catch(err => console.error(err))

  return { productResponse, clientResponse, localeResponse, nfoResponse, nfdResponse, ocResponse }
}