

import { Geometry, FeatureCollection, MultiLineString } from 'geojson';
import * as zod from 'zod';
import { GeoJSON2DMultiLineString, GeoJSON2DPositionSchema } from 'zod-geojson';

export interface GeoCodeProperties {
    readonly label: string;
    readonly score: number;
    readonly housenumber?: string;
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly postcode: string;
    readonly citycode: string;
    readonly x: number;
    readonly y: number;
    readonly city: string;
    readonly context: string;
    readonly importance: number;
    readonly street?: string;
}

export const GeoCodePropertiesSchema = zod.object({
    label: zod.string(),
    score: zod.number(),
    housenumber: zod.string().optional(),
    id: zod.string(),
    type: zod.string(),
    name: zod.string(),
    postcode: zod.string(),
    citycode: zod.string(),
    x: zod.number(),
    y: zod.number(),
    city: zod.string(),
    context: zod.string(),
    importance: zod.number(),
    street: zod.string().optional()
}).readonly();

// Schéma pour un segment de l'itinéraire
const SegmentSchema = zod.object({
  distance: zod.number(),        // Distance du segment en mètres
  duration: zod.number(),        // Durée du segment en secondes
  steps: zod.array(zod.object({  // Étapes du segment, par exemple directions
    instruction: zod.string(),   // Description de l'étape
    distance: zod.number(),      // Distance pour cette étape
    duration: zod.number(),      // Durée de cette étape
  })).optional(),
  summary: zod.object({
    total_distance: zod.number().optional(),  // Distance totale pour ce segment (rendue optionnelle)
    total_duration: zod.number().optional(),  // Durée totale pour ce segment (rendue optionnelle)
  }).optional(),
});

// Schéma pour les waypoints (points de passage)
const WaypointSchema = zod.array(zod.tuple([zod.number(), zod.number()])).optional(); // [lng, lat]

// Schéma pour le résumé de l'itinéraire
const SummarySchema = zod.object({
  total_distance: zod.number().optional(),  // Distance totale de l'itinéraire (rendue optionnelle)
  total_duration: zod.number().optional(),  // Durée totale de l'itinéraire (rendue optionnelle)
}).optional();

// Schéma pour la propriété `properties` de la réponse
export const PropertiesSchema = zod.object({
  segments: zod.array(SegmentSchema).optional(), // Liste des segments
  waypoints: WaypointSchema,         // Liste des waypoints
  summary: SummarySchema,           // Résumé de l'itinéraire
}).optional();

// Schéma pour la feature (élément de la collection)
const FeatureSchema = zod.object({
  type: zod.literal('Feature'),
  geometry: zod.object({
    type: zod.literal('MultiLineString'),
    coordinates: zod.array(zod.array(zod.number())),  // Liste de coordonnées [lng, lat]
  }),
  properties: PropertiesSchema,  // Les propriétés de la feature
});

// Schéma pour la réponse complète (FeatureCollection)
const FeatureCollectionSchema = zod.object({
  type: zod.literal('FeatureCollection'),
  features: zod.array(FeatureSchema),  // Liste des features
});
export function getParserJSONFeatureCollection<G extends Geometry, T>(
  geometrySchema: zod.ZodType<G>,
  propertiesSchema: zod.ZodType<T>
): (obj: unknown) => Promise<FeatureCollection<G, T>> {
  return async (obj: unknown) => {
    const schema = zod.object({
      type: zod.literal('FeatureCollection'),
      features: zod.array(zod.object({
        type: zod.literal('Feature'),
        geometry: geometrySchema,
        properties: propertiesSchema
      }))
    });
    return schema.parseAsync(obj) as (Promise<FeatureCollection<G, T>>);
  };
}
    

