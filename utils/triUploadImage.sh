#!/bin/bash
#!/bin/bash

# Dossier à analyser
dossier="/Users/dontpanic/Documents/Freelance/roulerPourAider/frontend/export/assets/uploads"

# Crée un dossier pour stocker les originaux (optionnel)
originaux_dossier="${dossier}/originaux"
mkdir -p "$originaux_dossier"

# Extensions prises en charge
extensions="jpg JPG jpeg png PNG webp"

 # Boucle sur les fichiers avec les extensions spécifiées dans le dossier
for fichier in "$dossier"/*; do
  # echo "Fichier trouvé : $fichier"
    # Vérifie si le fichier a une extension prise en charge
    for ext in $extensions; do
      # echo "Extension : $ext"
        if [[ "$fichier" == *.$ext ]]; then
            # Vérifie que le fichier ne contient pas les préfixes indésirables
            if [[ "$(basename "$fichier")" != large_* && \
                  "$(basename "$fichier")" != medium_* && \
                  "$(basename "$fichier")" != small_* && \
                  "$(basename "$fichier")" != thumbnail_* ]]; then
                echo "Fichier original trouvé : $fichier"
                # Copie ou déplace le fichier dans le dossier des originaux
                cp "$fichier" "$originaux_dossier/"
            fi
        fi
    done
done

echo "Les fichiers originaux ont été copiés dans : $originaux_dossier"