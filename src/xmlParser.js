// xmlHandler.mjs

// Import xmldom for Node.js if running in a Node.js environment
import { DOMParser as NodeDOMParser, XMLSerializer as NodeXMLSerializer } from "xmldom";

// Determine the runtime environment
const isNode = typeof window === "undefined";

// Set DOMParser and XMLSerializer based on the environment
const DOMParser = isNode ? NodeDOMParser : window.DOMParser;
const XMLSerializer = isNode ? NodeXMLSerializer : window.XMLSerializer;

/**
 * Parses an XML string into a DOM document.
 * @param {string} xmlString - The XML string to parse.
 * @returns {Document} The parsed DOM document.
 */
export const parseXML = (xmlString) => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "application/xml");
};

/**
 * Serializes a DOM document back into an XML string.
 * @param {Document} xmlDoc - The DOM document to serialize.
 * @returns {string} The XML string.
 */
export const serializeXML = (xmlDoc) => {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
};
