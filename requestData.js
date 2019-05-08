var velib={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=10&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:lat,
    keywordLongitude:lon,
    name:name,
    other_stats:{
        capacity:capacity
    }
}

var recharge={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=bornes-de-recharge-pour-vehicules-electriques&rows=10&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:latitude,
    keywordLongitude:longitude,
    name:nom_station,
    other_stats:{
        capacity:nombre_places
    }
}

var stationnement={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-voie-publique-emplacements&facet=regpri&facet=regpar&facet=typsta&facet=arrond&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geo_shape.coordinates,
    keywordLongitude:fields.geo_shape.coordinates,
    name:nom_voie,
    other_stats:{
        type:typevoie,
        price:tar,
        category:regpri
    }
}

var stationnementInterdit={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-sur-voie-publique-stationnement-interdit&facet=regpar&facet=regpri&facet=arrond&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geo_shape.coordinates,//linestring
    keywordLongitude:fields.geo_shape.coordinates,//linestring
    name:nomvoie,
    other_stats:{
        type:typevoie
    }
}

//bornes métro et train
"https://dataratp.opendatasoft.com/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&facet=stop_name&geofilter.distance=48.852969%2C2.349903%2C500"
stop_coordinates //geo points
stop_name
dist




var centreSoins={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=consultations_des_centres_de_sante&facet=nom_de_lactivite&facet=specialite&facet=adresse_code_postal&facet=adresse_ville&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:latitude,
    keywordLongitude:longitude,
    name:nom_du_centre_de_sante,
    other_stats:{
        activity:nom_de_lactivite,
        specialty:specialite,
        phone:numero_de_telephone,
    }
}

var medecins={
    dataset:"https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-sur-les-medecins-accredites&facet=libelle_long_de_la_specialite_du_medecin&facet=date_d_accreditation_du_medecin&facet=nom_du_departement&facet=statut_d_exercice&facet=nom_region&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geom_x_y,
    keywordLongitude:fields.geom_x_y,
    name:nom_du_medecin,
    surname:prenom_du_medecin,
    other_stats:{
        activity:statut_d_exercice,
        specialty:libelle_long_de_la_specialite_du_medecin,
        phone:numero_de_telephone,
    }
}

var pharmacies={
    dataset:"https://public.opendatasoft.com/api/records/1.0/search/?dataset=metropole-finess-cat620-pharmacies-dofficines&facet=c_datemaj&facet=cc_loc_geo&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geo_point_2d,
    keywordLongitude:fields.geo_point_2d,
    name:c_rs,
    other_stats:{
        adress:c_adresse,
        zipcode:c_com_code,
    }
}


var commerce={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=commercesparis&facet=arro&facet=situation&facet=libact&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geometry.coordinates,
    keywordLongitude:fields.geometry.coordinates,
    name:libact,
    other_stats:{
        adress:adresse_complete,
    }
}

var ecoles={
    dataset:"https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires&rows=20&facet=id_projet&facet=arr_libelle&facet=arr_insee",
    keywordLatitude:fields.geo_point_2d,
    keywordLongitude:fields.geo_point_2d,
    name:libelle,
    other_stats:{
        adress:adresse,
        zipcode:arr_insee
    }
}

var creches={
    dataset:"https://public.opendatasoft.com/api/records/1.0/search/?dataset=equipement-ponctuel-petite-enfance&facet=l_ep_maj&facet=l_ep_min&facet=c_suf1&facet=c_liaison&facet=l_voie&facet=b_public&facet=d_annee_cr&facet=lib_ql1&facet=val_qn1&facet=n_sq_ee&geofilter.distance=48.852969%2C2.349903%2C500",
    keywordLatitude:fields.geo_point_2d,
    keywordLongitude:fields.geo_point_2d,
    name:l_ep_maj,
    other_stats:{
        adress_type:c_desi,
        adress_one:l_ep_min,
        adress:l_voie,
    }
}

//liste agence bpce
"https://bpce.opendatasoft.com/api/records/1.0/search/?dataset=agences-caisse-depargne0&facet=libelle_caisse&facet=marche&facet=code_departement&geofilter.distance=48.852969%2C2.349903%2C500";
code_postal;
adresse;
lambert2etendu //coords-geo point 2d
nom_de_l_agence;
dist

//liste distributeurs BPCE
"https://bpce.opendatasoft.com/api/records/1.0/search/?dataset=distributeurs-bp-ce&facet=reseau&facet=nom_etablissement&geofilter.distance=48.852969%2C2.349903%2C500";
wgs84 //loc geo
reseau //CE ou BP
nom_agence;
adresse;
ville;
dist

//toilettes à paris

//equipements proximité
