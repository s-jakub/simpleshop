const categories = {
    maincategory: { 
        "mężczyzna": 'male',
        "kobieta": 'female',
        "dziecko": 'child',
        },
    subcategory: {
            "kurtki i płaszcze" : 'jacketsAndCoats',
            "kamizelki" : 'vests',
            "t-shirty" : 'tShirts',
            "polo" : 'poloShirts',
            "koszule" : 'shirts',
            "bluzy" : 'sweatshirts',
            "spodnie" : 'pants',
            "swetry" : 'sweaters',
            "jeansy" : 'jeans',
            "szorty" : 'shorts',
            "marynarki" : 'navy',
            "garnitury" : 'suits',
            "piżamy" : 'pajamas',
            "bielizna": 'underwear',
            "torby" : 'bags',
            "skarpety" : "socks",
            "czapki" : 'caps',
            "okulary" : 'glasses',
            "paski" : 'belts',
            "sportowe" : 'sportShoes',
            "mokasyny" : 'moccasinsShoes',
            "klapki" : 'slippers',
            "sukienki" : 'dresses',
            "topy" : 'tops',
            "spódnice" : 'skirts'


        }
}


export const translate = (mainCategory, subCtegory) => {
    let maincategoryLowerCase = String(mainCategory).toLowerCase();
    let subcategoryLowerCase = String(subCtegory).toLowerCase();

    return {mainCategory: categories.maincategory[maincategoryLowerCase], subCategory: categories.subcategory[subcategoryLowerCase] }
}