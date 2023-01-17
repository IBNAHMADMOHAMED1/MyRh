import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-app-landing',
    templateUrl: './app-landing.component.html',
    styleUrls: ['./app-landing.component.scss']
})
export class AppLandingComponent implements OnInit {

  
    constructor( private titleService: Title, private meta: Meta ) {
        this.titleService.setTitle('Mondo Jardine - Gazon Synthétique et Naturel, Entretien-espaces-verts, Elagage arbres & palmiers');
    }

  ngOnInit() {
    this.meta.updateTag({ name: "description', content: 'Mondo Jardine est une entreprise spécialisée dans l'installation et l'entretien de gazon synthétique et naturel, l'aménagement d'espaces verts et l'elagage d'arbres et de palmiers. Nous offrons des services de qualité à des prix compétitifs dans toute la région." });
         

    // Set the meta description
    this.meta.updateTag({ name: 'description', content: "Mondo Jardine est une entreprise spécialisée dans l'installation et l'entretien de gazon synthétique et naturel, l'aménagement d'espaces verts et l'elagage d'arbres et de palmiers. Nous offrons des services de qualité à des prix compétitifs dans toute la région." });

    // Set the meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'gazon synthétique, gazon naturel, entretien jardin, aménagement jardin, elagage arbres, elagage palmiers, Mondo Jardine' });

    // Set the meta robots
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Set the meta viewport
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' });

    // Set the meta theme color
    this.meta.updateTag({ name: 'theme-color', content: '#000000' });

    // Set the og:title meta tag
    this.meta.updateTag({ property: 'og:title', content: 'Mondo Jardine - Gazon Synthétique et Naturel, Entretien-espaces-verts, Elagage arbres & palmiers' });

    // Set the og:description meta tag
    this.meta.updateTag({ property: 'og:description', content: "Mondo Jardine est une entreprise spécialisée dans l'installation et l'entretien de gazon synthétique et naturel, l'aménagement d'espaces verts et l'elagage d'arbres et de palmiers. Nous offrons des services de qualité à des prix compétitifs dans toute la région." });

    // Set the og:image meta tag
    this.meta.updateTag({ property: 'og:image', content: 'https://www.mondojardine.com/images/og-image.jpg' });

    // Set the twitter:card meta tag
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
  }

}