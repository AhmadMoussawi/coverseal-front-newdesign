export function generateTranslation(languages_code: string) {
  const global = {
    languages_code,
    // global
    full_name_label: "Nom & prénom",
    mail_label: "Adresse mail",
    phone_label: "Téléphone",
    submit_text: "Submit",
    // price request
    price_request_title: "Demande de devis ou catalogue",
    country_label: "Pays",
    demand_label: "Je voudrais",
    price_request_label: "Un devis",
    zip_code_label: "Code postal",
    // after sale
    after_sale_title: "Besoin d'aide avec votre Coverseal ?",
    after_sale_sentence:
      "Si notre FAQ ne vous a pas aidé, un collaborateur vous accompagne",
    problem_description_label: "Description du problem",
    message_label: "Ecrivez ici votre message",
    add_photos_label: "Inclure des photos",
    coverseal_type_label: "Type de Coverseal",
    // main menu
    the_coverseal_main_nav_link_text: "La Coverseal",
    benefits_main_nav_link_text: "Ses avantages",
    models_main_nav_link_text: "Modèles & Personnalisation",
    achievements_main_nav_link_text: "Réalisations",
    about_us_main_nav_link_text: "Qui sommes-nous ?",
    contact_main_nav_link_text: "Contact",
    jobs_main_nav_link_text: "Jobs",
    partnerships_main_nav_link_text: "Devenir partenaire",
    faq_main_nav_link_text: "FAQ",
    after_sale_main_nav_link_text: "SAV",
    // side nav
    catalog_side_nav_link_text: "Catalogue",
    price_request_side_nav_link_text: "Devis",
    configurator_side_nav_link_text: "Configurateur",
    after_sale_side_nav_link_text: "SAV",
    // footer
    contact_link_text: "Contacts",
    privacy_policy_link_text: "Privacy policy",
    newsletter_subscribe_link_text: "Subscribe",
    terms_and_conditions_link_text: "Terms & conditions",
    newsletter_text:
      "<p>Rejoignez notre <em>newsletter</em> &amp; restez inform&eacute;s de nos<em> news</em> &amp; nouveaux <em>projets</em></p>",
    // notifications
    success_title: "Success",
    error_title: "Success",
    error_content:
      "Une erreur c'est produite. Le formulaire n'a pas pu être envoyé.",
    success_content:
      "Le formulaire à été correctement envoyé. Nous reviendrons vers vous rapidement.",
    // validations
    wrong_email: "Email non valide",
    wrong_phone: "Téléphone non valide",
  };

  const the_coverseal_template = {
    languages_code,
    seo_title: "La Coverseal",
    seo_description:
      "Une technologie éprouvée et brevetée au service de votre piscine.",
    main_title: "La Coverseal",
    main_paragraph:
      "<p>Une technologie fiable et brevetée au service de votre piscine.</p>\n<p>La marque Coverseal est née de la volonté d'apporter une solution tant esthétique que performante pour une clientèle exigeante. Issue du monde de l'industrie et plus précisément des portes souples à ouverture rapide, cette technologie a été adaptée au milieu spécifique de la piscine...</p>",
    certificate_title: "Brevets",
    certificate_paragraph:
      "<p>Le système exclusif et breveté Coverseal propose un mécanisme unique qui permet à la membrane polymère de marque Serge Ferrari de se dérouler et se verrouiller simultanément grâce à un rail extra-plat et très discret de 10 mm d’épaisseur. La membrane, développée pour être très résistante aux UV, aux conditions climatiques extrêmes et aux pressions import- antes (+300kg/mètre linéaire), restera parfaitement tendue tout au long des années pour un rendu esthétique irréprochable et une sécurité sans faille. De plus, le rail ne présente aucun danger pour ceux qui pourraient y marcher. Une courroie d’entraînement ferme en permanence ce rail le rendant inoffensif pour les orteils, même des petits enfants et empêche également de toute accumulation de débris.</p>",
    comfort_title: "Confort d'utilisation",
    comfort_paragraph:
      "<p>L’un des nombreux avantages de nos couvertures Coverseal est l’optimisation de la zone occupée aussi bien pendant l’été que pendant la période hivernale. Contrairement à d’autres produits « 4 saisons » que sont par exemple les abris de piscines, la zone de dégagement est fortement réduite. La facilité et la rapidité d’ouverture sont également des atouts importants de cette couverture unique de par ses performances.</p>",
    models_link_text: "Nos Modèles",
    discretion_title: "Discrétion",
    discretion_paragraph:
      "<p>Sécuriser ou couvrir sa piscine ne rime pas systématiquement avec élégance. Nos couvertures de piscine Coverseal ont été développées dans un but précis : sécuriser votre bassin sans dénaturer son environnement.</p>",
    gallery_link_text: "+ De photos",
    why_coverseal_title: "Pourquoi une Coverseal ?",
    benefits_link_text:
      "La Coverseal détient plusieurs avantages Retrouvez-les tous en détails ici !",
    faq_link_text:
      "D’autres questions? Consultez la liste des questions les plus posées",
  };

  const achievements_template = {
    languages_code,
    seo_title: "Réalisations",
    seo_description:
      "Une technologie éprouvée et brevetée au service de votre piscine.",
    main_title: "Réalisations",
    back_to_achievements: "Retour aux réalisations",
    next_coverseal: "Voir la Coverseal suivante",
    models_link_text: "A propos de ce modèle",
  };

  const page_not_found_template = {
    languages_code,
    seo_title: "Oups. Désolé, cette page n’a pas été trouvée !",
    seo_description:
      "Une description générale par rapport au site (c'est ce que genre github fait sur ça 404)",
    main_title: "Oups.\nDésolé, cette page n’a pas été trouvée !",
    back_to_home_link_text: "Pour continuer la visite, rendez-vous ici !",
  };

  const privacy_policy_template = {
    languages_code,
    seo_title: "Privacy Policy",
    seo_description: "lorem ipsum",
    main_title: "Privacy Policy",
    back_to_home_link_text: "Retour à l'acceuil",
    content:
      "<h2>1. Mentions l&eacute;gales</h2>\n<p>Le site internet https://coverseal-stage.fr appartient &agrave; et est exploit&eacute; par la soci&eacute;t&eacute; anonyme de droit belge Becoflex (identifi&eacute;e dans les pr&eacute;sentes comme &laquo; Coverseal &raquo;).</p>\n<p>Adresse et si&egrave;ge social : 8, Route du Grand Peuplier - 7110 Str&eacute;py-Bracquegnies, Belgique.</p>\n<p>Nom commercial : Coverseal.</p>\n<p>T&eacute;l&eacute;phone : 0032.(02.367.10.80.</p>\n<p>Email : info@coverseal.com</p>\n<p>TVA : BE 0893.262.805.</p>\n<p>Les conditions g&eacute;n&eacute;rales peuvent &ecirc;tre consult&eacute;es ici : <a title=\"\" href=\"somewhere\" target=\"_blank\" rel=\"noopener\">Conditions g&eacute;n&eacute;rales</a></p>\n<p>Garantie contractuelle standard : 2 ans sur le produit.</p>\n<p>Becoflex est active dans la fabrication et la vente de couvertures de s&eacute;curit&eacute; pour piscines.</p>\n<p>Becoflex est assur&eacute;e aupr&egrave;s de la soci&eacute;t&eacute; MS Amlin</p>\n<h2>​2. Application des Conditions G&eacute;n&eacute;rales d&rsquo;Utilisation</h2>\n<p>2.1 Les pr&eacute;sentes conditions g&eacute;n&eacute;rales d&rsquo;utilisation (ci-apr&egrave;s &laquo; CGU &raquo;) d&eacute;finissent les droits et obligations qui vous sont applicables en tant qu&rsquo;utilisateur (ci-apr&egrave;s &laquo; Utilisateur &raquo;) lors de vos acc&egrave;s &agrave; notre site internet (ci-apr&egrave;s &laquo; le Site &raquo;).</p>\n<p>2.2 L&rsquo;acc&egrave;s et/ou l&rsquo;utilisation du Site emporte l&rsquo;acceptation des CGU et de toutes modifications qui y sont apport&eacute;es, sans pr&eacute;judice d&rsquo;&eacute;ventuelles conditions contractuelles particuli&egrave;res applicables.</p>\n<p>2.3 Coverseal se r&eacute;serve le droit, &agrave; tout moment et sans pr&eacute;avis, de modifier les pr&eacute;sentes CGU. L&rsquo;utilisateur est suppos&eacute; prendre connaissance p&eacute;riodiquement des changements apport&eacute;s aux pr&eacute;sentes CGU.</p>\n<h2>3. Accessibilit&eacute;</h2>\n<p>3.1 Coverseal se r&eacute;serve le droit d&rsquo;apporter des modifications ou des corrections au site internet, ainsi qu&rsquo;aux informations contenues sur celui-ci, de supprimer des informations contenues sur le site internet, et/ou d&rsquo;interrompre ou de suspendre tout en partie des fonctionnalit&eacute;s du site internet ou l&rsquo;acc&egrave;s au site internet lui-m&ecirc;me (&agrave; des fins de maintenance ou toutes autres fins techniques et op&eacute;rationnelles).</p>\n<h2>4. Utilisation du site</h2>\n<p>4.1 L&rsquo;Utilisateur reconnait qu&rsquo;il est uniquement autoris&eacute; &agrave; utiliser le site internet pour rechercher de l&rsquo;information, introduire des demandes ou passer des commandes. L&rsquo;Utilisateur s&rsquo;engage &agrave; ne pas utiliser le site internet &agrave; d&rsquo;autres fins, et notamment &agrave; des fins ill&eacute;gales ou susceptibles de porter atteinte aux bonnes m&oelig;urs, &agrave; l&rsquo;int&eacute;grit&eacute;, &agrave; la s&eacute;curit&eacute; ou &agrave; la r&eacute;putation du site internet ou aux droits de Coverseal ou de tiers.</p>\n<h2>5. Responsabilit&eacute;</h2>\n<p>5.1 Toutes les informations contenues sur le site internet de Coverseal sont des informations g&eacute;n&eacute;rales, fournies en dehors de toute relation contractuelle avec Coverseal. Ces informations ne peuvent constituer un conseil personnel, professionnel ou juridique &agrave; l'utilisateur.</p>\n<p>5.2 Coverseal met en oeuvre des moyens raisonnables pour assurer l'exactitude de ces informations mais ne garantit pas que ces informations sont exemptes de toute erreur ou omission.</p>\n<p>5.3 Coverseal ne peut &ecirc;tre tenue responsable (sauf faute lourde ou intentionnelle de sa part) des dommages directs ou indirects (sauf dommage corporel caus&eacute; &agrave; l'utilisateur) qui pourraient r&eacute;sulter :</p>\n<ul>\n<li>de l'utilisation des informations fournies sur le site</li>\n<li>du fait que certaines informations seraient incorrectes, incompl&egrave;tes ou indisponibles</li>\n<li>de l'utilisation du site ou de l'impossibilit&eacute; d'utiliser le site</li>\n<li>de l'utilisation frauduleuse de son site internet par des utilisateurs ou des tiers</li>\n<li>de la transmission de virus ou de tout autre programme malveillant &agrave; l'utilisateur via le site internet.</li>\n</ul>\n<h2>6. Propri&eacute;t&eacute; intellectuelle</h2>\n<p>6.1 Le site internet et tous ses composants sont prot&eacute;g&eacute;s par des droits de propri&eacute;t&eacute; intellectuelle. En particulier, les noms, logos et autres signes distinctifs de Coverseal, de ses partenaires ou des tiers pr&eacute;sents sur le site sont susceptibles d'&ecirc;tre prot&eacute;g&eacute;s par le droit des marques. La pr&eacute;sentation du site, les contenus &eacute;ditoriaux, textes, images, photographies, ou contenus audiovisuels du site sont prot&eacute;g&eacute;s par le droit d'auteur. 6.2 Sauf exception l&eacute;gale, toute reproduction, en totalit&eacute; ou en partie, et/ou toute communication au public d'&eacute;l&eacute;ments pr&eacute;sents sur le site sont interdits sans l'accord &eacute;crit pr&eacute;alable de Coverseal.</p>\n<p>6.3 L'utilisateur s'engage &agrave; ne pas retirer, alt&eacute;rer ou occulter toute notice de droit d'auteur ou indication de protection par un droit de propri&eacute;t&eacute; intellectuelle figurant sur le site.</p>\n<h2>7. Traitement des donn&eacute;es &agrave; caract&egrave;re personnel et cookies</h2>\n<p>7.1 Coverseal utilise les donn&eacute;es que l'Utilisateur fournit via la formulaire de contact sur le site ou par email pour r&eacute;pondre &agrave; ses questions, une demande d'offre ou de rendez-vous.</p>\n<p>7.2 Les donn&eacute;es &agrave; caract&egrave;re personnel que l'Utilisateur fournit sont trait&eacute;s conform&eacute;ment &agrave; la Politique Vie Priv&eacute;e de Coverseal consultable ici : Politique Vie Priv&eacute;e</p>\n<p>7.3 Coverseal place &eacute;galement des cookies sur le site. Ces cookies sont plac&eacute;s par des tiers avec lesquels nous collaborons. Les informations sur les cookies et leur acceptation ou refus par l'Utilisateur est &eacute;galement r&eacute;gl&eacute;e par notre Politique Vie Priv&eacute;e consultable ici : Politique Vie Priv&eacute;e​</p>\n<h2>8. Conditions g&eacute;n&eacute;rales</h2>\n<p>8.1 Toutes vente ou prestation de service de Coverseal est r&eacute;gie par les conditions g&eacute;n&eacute;rales de vente de Coverseal consultable ici : Conditions g&eacute;n&eacute;rales​</p>\n<h2>9. Divers</h2>\n<p>9.1 La nullit&eacute; ou le caract&egrave;re non ex&eacute;cutoire de l'une des dispositions des pr&eacute;sentes CGU n'affectera pas la validit&eacute; des autres dispositions de ces CGU.</p>\n<p>9.2 Toute communication ou r&eacute;clamation concernant le site internet ou les pr&eacute;sentes conditions d'utilisation doivent &ecirc;tre adress&eacute;es par mail &agrave; rgpd@coverseal.com</p>\n<p>9.3 L'absence d'exercice par Coverseal d'un droit r&eacute;sultant des pr&eacute;sentes CGU ne constitue pas une renonciation &agrave; ce droit.</p>\n<h2>10. Loi applicable et juridiction</h2>\n<p>Les pr&eacute;sentes CGU sont r&eacute;gies par le droit belge, sans &eacute;gard aux dispositions de conflit de lois dans l'espace. Tout diff&eacute;rend d&eacute;coulant des pr&eacute;sentes CGU ou en relation avec celles-ci sera soumis aux cours et tribunaux de l'arrondissement de Bruxelles.</p>",
  };

  const terms_and_conditions_template = {
    languages_code,
    seo_title: "Terms & Conditions",
    seo_description: "lorem ipsum",
    main_title: "Terms & Conditions",
    back_to_home_link_text: "Retour à l'acceuil",
    content:
      "<p>Dans le cadre de ses activit&eacute;s et de votre utilisation du site internet https://coverseal-stage.fr , la soci&eacute;t&eacute; Becoflex S.A. , ayant son si&egrave;ge au 8, Route du Grand Peuplier - 7110 Str&eacute;py-Bracquegnies, portant le num&eacute;ro d&rsquo;entreprise 0893.262.805 et exer&ccedil;ant ses activit&eacute;s sous le nom commercial &lsquo;Coverseal&rsquo; (ci-apr&egrave;s &laquo; Coverseal &raquo; ou &laquo; nous &raquo;) est amen&eacute;e &agrave; traiter des donn&eacute;es &agrave; caract&egrave;re personnel vous concernant, en tant que responsable du traitement.</p>\n<p>La protection des donn&eacute;es &agrave; caract&egrave;re personnel est tr&egrave;s importante pour Coverseal, qui s&rsquo;engage &agrave; traiter ces donn&eacute;es conform&eacute;ment au R&egrave;glement n&deg; 2016/679 relatif &agrave; la protection des personnes physiques &agrave; l&rsquo;&eacute;gard du traitement des donn&eacute;es &agrave; caract&egrave;re personnel et &agrave; la libre circulation de ces donn&eacute;es (&laquo; RGPD &raquo;).</p>\n<p>La pr&eacute;sente Politique Vie Priv&eacute;e a pour but de vous informer des donn&eacute;es &agrave; caract&egrave;re personnel que nous utilisons, des raisons pour lesquelles nous les utilisons, de la dur&eacute;e de leur conservation et des modalit&eacute;s d&rsquo;exercice de vos droits relatifs &agrave; ces donn&eacute;es.</p>\n<h2>1. Comment recueillons-nous vos donn&eacute;es ?</h2>\n<p>Les informations que nous traitons peuvent &ecirc;tre :</p>\n<ul>\n<li>fournies par vos soins</li>\n<li>collect&eacute;es automatiquement aupr&egrave;s de vous lorsque vous visitez notre site Internet</li>\n</ul>\n<h2>​2. Quels types de donn&eacute;es &agrave; caract&egrave;re personnel sont collect&eacute;es et trait&eacute;es par Coverseal ?</h2>\n<p>Coverseal peut &ecirc;tre amen&eacute;e &agrave; collecter et traiter des donn&eacute;es &agrave; caract&egrave;re personnel (soit toute information se rapportant &agrave; une personne physique identifi&eacute;e ou identifiable), qui sont obtenues directement aupr&egrave;s de vous, entre autres lorsque vous utilisez notre site internet, via le formulaire de contact, lorsque vous nous contactez via d&rsquo;autres canaux, ou encore que vous signez un contrat avec nous.</p>\n<p><strong>Les cat&eacute;gories de donn&eacute;es &agrave; caract&egrave;re personnel que nous traitons sont les suivantes :</strong></p>\n<ul>\n<li>Concernant nos clients et clients potentiels (le client potentiel &eacute;tant la personne qui nous a contact&eacute;s pour avoir des renseignements sur nos produits et services) :\n<ul>\n<li>Donn&eacute;es de contact (nom, pr&eacute;nom, num&eacute;ro de t&eacute;l&eacute;phone, adresse postale et adresse mail);</li>\n<li>​Donn&eacute;es financi&egrave;res et transactionnelles de nos clients (donn&eacute;es relatives &agrave; ce que vous avez achet&eacute; chez nous et les paiements effectu&eacute;s, num&eacute;ro de client);</li>\n<li>Donn&eacute;es &eacute;lectroniques (adresse IP, votre type de navigateur, les pages de notre site internet que vous avez visit&eacute;es, le jour et heure auxquels vous avez visit&eacute; notre site);</li>\n</ul>\n</li>\n<li>Concernant nos fournisseurs, interm&eacute;diaires et revendeurs (personnes physiques ou repr&eacute;sentants des personnes morales) :\n<ul>\n<li>Donn&eacute;es de contact (nom, pr&eacute;nom, num&eacute;ro de t&eacute;l&eacute;phone, adresse postale et adresse mail);​- Donn&eacute;es bancaires, financi&egrave;res et transactionnelles (coordonn&eacute;es bancaires, informations li&eacute;es aux transactions financi&egrave;res effectu&eacute;es, num&eacute;ro de fournisseur le cas &eacute;ch&eacute;ant);</li>\n<li>Donn&eacute;es professionnelles (profession, employeur);</li>\n<li>Donn&eacute;es &eacute;lectroniques (adresse IP, votre type de navigateur, les pages de notre site internet que vous avez visit&eacute;es, le jour et heure auxquels vous avez visit&eacute; notre site);</li>\n</ul>\n</li>\n</ul>\n<h2>3. Pourquoi et sur quelles bases l&eacute;gales Coverseal utilise ces donn&eacute;es &agrave; caract&egrave;re personnel ?</h2>\n<p><strong>Coverseal traite les donn&eacute;es &agrave; caract&egrave;re personnel ci-dessus uniquement pour les finalit&eacute;s suivantes :</strong></p>\n<ul>\n<li>Vous fournir les produits et services que vous avez command&eacute;s;</li>\n<li>Vous fournir des informations par rapport &agrave; ces produits et services (par exemple via l'envoi de catalogues, de fiches techniques, de devis, etc.);</li>\n<li>Conclure des contrats avec vous;</li>\n<li>Recevoir des produits et services si vous &ecirc;tes fournisseur;</li>\n<li>G&eacute;rer notre relation avec vous, par exemple en communiquant avec vous concernant nos ou vos produits et services, en g&eacute;rant vos demandes ou plaintes, en vous communiquant des instructions;</li>\n<li>Am&eacute;liorer la qualit&eacute; de nos produits et services;</li>\n<li>Effectuer et recevoir des paiements, g&eacute;rer notre comptabilit&eacute;;</li>\n<li>Vous contacter dans le cadre de nos campagnes commerciales ou pour l'envoi de nos enqu&ecirc;tes de satisfaction ou de nos catalogues;</li>\n<li>G&eacute;rer notre site internet, notre infrastructure informatique et offrir la meilleure exp&eacute;rience possible aux visiteurs de notre site internet;</li>\n<li>Respecter nos obligations l&eacute;gales et r&eacute;glementaires;</li>\n<li>D&eacute;fendre nos droits;</li>\n</ul>\n<p><strong>Coverseal traite vos donn&eacute;es &agrave; caract&egrave;re personnel en vertu des bases l&eacute;gales suivantes, selon les cas :</strong></p>\n<ul>\n<li>Votre consentement au traitement de vos donn&eacute;es &agrave; caract&egrave;re personnel pour une ou plusieurs finalit&eacute;s sp&eacute;cifiques (consentement que vous pouvez retirer : cfr infra);</li>\n<li>La n&eacute;cessit&eacute; du traitement pour ex&eacute;cuter le contrat que nous avons conclu ou ex&eacute;cuter les mesures pr&eacute;-contractuelles que vous avez demand&eacute;es (devis, offres..);</li>\n<li>Le traitement est n&eacute;cessaire aux fins des int&eacute;r&ecirc;ts l&eacute;gitimes poursuivis par Coverseal, ce qui comprends la bonne gestion de notre site internet, la poursuite et la protection de nos activit&eacute;s commerciales, le maintien de bonnes relations avec nos clients et l'am&eacute;lioration de nos produits et services.</li>\n</ul>\n<h2>4. Comment Coverseal conserve ces donn&eacute;es &agrave; caract&egrave;re personnel ?</h2>\n<p>Nous conservons ces donn&eacute;es &agrave; caract&egrave;re personnel pendant une dur&eacute;e n'exc&eacute;dant pas celle n&eacute;cessaire au regard des finalit&eacute;s pour lesquelles elles sont trait&eacute;es. Concernant nos fournisseurs, interm&eacute;diaires et revendeurs, les donn&eacute;es sont conserv&eacute;es pendant toute la dur&eacute;e de la relation contractuelle. Concernant nos prospects (les personnes qui nous contactent sur le site pour nous demander des informations ou une offre), les donn&eacute;es sont conserv&eacute;es pendant un an. Concernant les clients, les donn&eacute;es sont conserv&eacute;es pendant toute la dur&eacute;e de la relation contractuelle et 2 ans apr&egrave;s la fin de la relation contractuelle. Lorsque nous r&eacute;coltons des donn&eacute;es sur base de votre consentement, leur traitement prend fin d&egrave;s que vous retirez votre consentement.</p>\n<p><strong>Les donn&eacute;es &agrave; caract&egrave;re personnel peuvent &ecirc;tre transf&eacute;r&eacute;es aux cat&eacute;gories de destinataires suivantes :</strong></p>\n<ul>\n<li>Nos employ&eacute;s;</li>\n<li>Nos revendeurs dans la mesure o&ugrave; ils ont besoin de ces donn&eacute;es pour remplir leur mission :\n<ul>\n<li>Abrisud Deutschland Vertriebs GmbH &amp; Co. KG : Daimlerstrasse 3, 97437 Ha&szlig;furt, DE</li>\n<li>Abrisud SAS : 15 Rue Louis Aygob&egrave;re, ZI du Pont Peyrin, 32600 L'Isle-Jourdain, FR</li>\n<li>Abrisud Iberica Produccion, S.L : C/Montserrat Roig, 17, 08908 L'hospitalet De Llobregat, ES</li>\n<li>Abrisud Italy SRL : Viale Dante 3, 23900 Lecco, IT</li>\n<li>Abripool (Ideal Exteriores) : C/ Monturiol, 38, 08210 Barbera Del Valles, ES</li>\n<li>A-Kroll Proyectos Integrales : Paseo de la Habana, 9-11, 28036 Madrid, ES</li>\n<li>Alfresco Pools Ltd : Cordons, Round Green, TN172NB Cranbrook, UK</li>\n<li>Aqua Guard : BNEI BRITH 6, 4533617 Hod Hasharon, IL</li>\n<li>Art et Piscines : Rue des Charitables, 315, 62700 Bruay-La-Buissi&egrave;re, FR</li>\n<li>Bluepool : Havatikim, 43, 7683600 Mazliah, IL</li>\n<li>Cubiertas De Piscinas Galicia S. L. : C/ Otero Pedrayo, 10, 15888 Sig&uuml;eiro (Oroso), ES</li>\n<li>Delta Pool Rolf kleiber : Haupstrasse, 51, 4105 Biel-Benken Bl, CH</li>\n<li>Eifel Pool Wellness Gmbh : Bergstra. 20, 53090 Z&uuml;lpich, DE</li>\n<li>G&auml;rten und pools : Heidmoos,3, 3309 Kernenried, CH</li>\n<li>Hot Tub People Inc Limited : Unit 20, Old Mills Industrial Estate, PAULTON, BS397SU Bristol, UK</li>\n<li>Kinniburgh Pools Limited : Portmore Estate, , Scotland, EH458QT Edinburgh, UK</li>\n<li>Magic Pool AG/SA : Frobenstrasse, 57, 4053 Basel, CH</li>\n<li>MPW B.V. : Stayerhofweg, 2c, 5861EJ Wanssum, NL</li>\n<li>Nautilus Badkultur S.&agrave;. : Rue de Contern, 11, 5955 Itzig, LU</li>\n<li>Nautilus Pools LTD : Manor Nursery, Lagness Road, P020 1LJ Chichester, UK</li>\n<li>Nicollier Piscines SA : Chemin du Rh&ocirc;ne, 133, 1926 Fully, CH</li>\n<li>NOLL Gmbh : Hirschentanzstrasse, 11, 2384 Breitenfurt, AT</li>\n<li>Pahlen International AS : Leirvollen, 27A, 3736 Skien, NO</li>\n<li>Pooltechnikshop : Niedernbergerstrasse, 54, 63762 Gro&szlig;ostheim, DE</li>\n<li>Tec h2o : Ribba lieu dit Quadralella, 20137 Porto Vecchio, Corsica, FR</li>\n<li>Vaba Basseng op Spa as : Grini Naeringspark 3, 1361 Osteras, NO</li>\n<li>Woestelandt Piscines : Route Nationale 76, Le launay, 18100 Th&eacute;nioux, FR</li>\n<li>Zwembaden met Stijl : Koningsweg, 2-03 , 3762 EC Soest, NL</li>\n<li>Zwembadplus BV : Dorperesch 27, 7641 Wierden, NL</li>\n</ul>\n</li>\n<li>En cas de n&eacute;cessit&eacute; (audits de comptes, audits commerciaux, litiges) nos mandataires et certaines professions r&eacute;glement&eacute;es telles que les avocats ou les comissaires aux comptes;</li>\n<li>Les autorit&eacute;s comp&eacute;tentes (par exemple les autorit&eacute;s fiscales), pour resecter nos obligations l&eacute;gales et r&eacute;glementaires;</li>\n<li>Les autorit&eacute;s judiciaires en cas de litige, dans la limite de ce qui est permis par la r&eacute;glementation.</li>\n<li>Ces donn&eacute;es sont conserv&eacute;es sur notre progiciel de gestion int&eacute;gr&eacute; ERP. Coverseal ne transf&egrave;re pas syst&eacute;matiquement les donn&eacute;es en dehors de l&rsquo;Union europ&eacute;enne. Dans certains cas, Coverseal peut &ecirc;tre amen&eacute;e &agrave; transf&eacute;rer vos donn&eacute;es de contact &agrave; des pays en dehors de l&rsquo;Union europ&eacute;enne (Isra&euml;l, Norv&egrave;ge, Suisse) lorsque votre demande concerne une piscine situ&eacute;e dans un de ces pays.</li>\n</ul>\n<h2>5. Comment prot&eacute;geons-nous vos donn&eacute;es ?</h2>\n<p>Nous prenons toutes les mesures raisonnables pour &eacute;viter la perte, l&rsquo;abus, la publication, l&rsquo;acc&egrave;s ou la modification sans autorisation de vos donn&eacute;es personnelles. Les mesures indispensables sont prises, tant sur le plan technique qu&rsquo;organisationnel, pour assurer un niveau de s&eacute;curit&eacute; suffisant. Les donn&eacute;es que nous collectons sont conserv&eacute;es dans un environnement s&eacute;curis&eacute; et trait&eacute;es de mani&egrave;re confidentielle. Les personnes travaillant pour nous sont tenues de respecter la confidentialit&eacute; de vos informations. Lorsque nous collaborons avec d'autres parties, nous exigeons d'elles le m&ecirc;me niveau de s&eacute;curit&eacute;.</p>\n<p>Si vous pensez que vos informations personnelles sont utilis&eacute;es de mani&egrave;re inappropri&eacute;e par nous ou par des tiers, veuillez-nous en informer imm&eacute;diatement par courrier &eacute;lectronique &agrave; l&rsquo;adresse e-mail suivante : rgpd@coverseal.com​</p>\n<h2>6.Comment est-ce que Coverseal utilise des cookies ?</h2>\n<p>Les cookies sont de petits morceaux de donn&eacute;es stock&eacute;s sur le navigateur d'un visiteur du site. Nous pla&ccedil;ons des cookies sur notre site internet. Ces cookies sont plac&eacute;s par des tiers avec lesquels nous collaborons. Le traitement des donn&eacute;es &agrave; caract&egrave;re personnel collect&eacute;es via les cookies est r&eacute;gi par la pr&eacute;sente Politique Vie Priv&eacute;e.</p>\n<p>Il faut distinguer les cookies de session (&eacute;ph&eacute;m&egrave;re), qui sont effac&eacute;s lorsque les visiteurs du site ferment leur navigateur, des cookies persistants, qui sont stock&eacute;s sur le disque dur d'un visiteur du site jusqu'&agrave; leur date d'expiration (&agrave; une date d'expiration d&eacute;finie) ou jusqu'&agrave; leur supression.</p>\n<p>Nous utilisons d'une part des cookies strictement n&eacute;cessaires (qui permettent &agrave; nos visiteurs de naviguer sur notre site et qui sont &eacute;galement n&eacute;cessaires pour des raisons de s&eacute;curit&eacute;) et &eacute;galement des cookies fonctionnels/d'analyse (qui \"m&eacute;morisent\" les visiteurs afin d'am&eacute;liorer leur exp&eacute;rience utilisateur et de mesurer l'audience de notre site internet) et qui ne sont pas strictement n&eacute;cessaires pour l'utilisation du site internet.</p>\n<p><strong>En particulier, nous utilisons les types de cookies strictement n&eacute;cessaires suivants :</strong></p>\n<ul>\n<li>ForceFlashSite (session) : Lors de l'affichage d'un site mobile (ancien mobile sous m.domain.com), le serveur sera forc&eacute; d'afficher la version non mobile et &eacute;vitera la redirection vers le site mobile.</li>\n<li>Hs (session) : s&eacute;curit&eacute;. &bull; XSRF-TOKEN (session) : s&eacute;curit&eacute;.</li>\n<li>TS*: s&eacute;curit&eacute;</li>\n<li>TS01******* : s&eacute;curit&eacute;</li>\n<li>TSxxxxxxxx : s&eacute;curit&eacute;</li>\n<li>Tsxxxxxxxx_d : s&eacute;curit&eacute;</li>\n</ul>\n<p>La dur&eacute;e de vie de ce cookie est limit&eacute;e &agrave; la dur&eacute;e de la session de l&rsquo;utilisateur.</p>\n<p>Moyennant votre consentement, nous utilisons &eacute;galement les cookies fonctionnels/d&rsquo;analyse suivants:</p>\n<ul>\n<li>Les cookies fonctionnels &laquo; _ga &raquo;, &laquo; _gid &raquo; et &laquo; _gat &raquo; de Google Analytics (service d'analyse de site internet fourni par Google Inc.) ; La dur&eacute;e de vie de ces cookies a &eacute;t&eacute; limit&eacute;e &agrave; 1 an pour le cookie &laquo; _ga &raquo;, 24 h pour le cookie &laquo; _gid &raquo; et 10 minutes pour le cookie &laquo;&not;_gat &raquo;. Coverseal a, par d&eacute;faut, proc&eacute;d&eacute; &agrave; l&rsquo;anonymisation des adresses IP envoy&eacute;es &agrave; Google Analytics afin de prot&eacute;ger votre anonymat.</li>\n<li>svSession (Permanent, deux ans): Identifier les visiteurs uniques et suivre les sessions d'un visiteur sur un site.</li>\n<li>SSR-caching (dur&eacute;e de la session): Indiquer le rendu d'un site.</li>\n<li>smSession (permanent, 2 semaines): Identifier les visiteurs connect&eacute;s sur le site.</li>\n</ul>\n<p>Ces informations sont stock&eacute;es par Google sur des serveurs situ&eacute;s aux Etats-Unis. En vertu du droit de l&rsquo;U.E., Google ne peut fournir les informations &agrave; des tiers que si elle y est l&eacute;galement tenue ou si des tiers traitent ces donn&eacute;es pour le compte de Google.</p>\n<p>Pour les cookies strictement n&eacute;cessaires, le traitement est fond&eacute; sur notre int&eacute;r&ecirc;t l&eacute;gitime en tant que responsable du traitement.</p>\n<p>Nous demandons votre consentement pour le placement de ces cookies non strictement n&eacute;cessaires lors de votre utilisation de notre site internet. Quand vous acc&eacute;dez &agrave; notre site interne, une banni&egrave;re d'information vous permet d'accepter ou de refuser les cookies. Si vous avez autoris&eacute;s &agrave; utiliser des cookies non strictement n&eacute;cessaires, vous pouvez toujours retirer votre consentement via le lien suivant : rgpd@coverseal.com</p>\n<p>Vous avez &eacute;galement la possibilit&eacute; par la suite de changer les param&egrave;tres de votre navigateur afin de d&eacute;sactiver ou supprimer les cookies. A cet &eacute;gard, nous vous recommandons d'utiliser un des liens suivants :</p>\n<ul>\n<li>Param&egrave;tres de cookies dans Firefox</li>\n<li>Param&egrave;tres de cookie dans Internet Explorer</li>\n<li>Param&egrave;tres de cookie dans Google Chrome</li>\n<li>Param&egrave;tres de cookie dans Safari (OS X)</li>\n<li>Param&egrave;tres de cookie dans Safari (iOS)</li>\n<li>Param&egrave;tres de cookie dans Android</li>\n</ul>\n<h2>7. Quels sont vos droits et comment pouvez-vous les exercer ?</h2>\n<p>En vertu du RGPD, vous avez les droits suivants :</p>\n<ul>\n<li>Droit d'acc&egrave;s auxdites donn&eacute;es &agrave; caract&egrave;re personnel et droit d'obtenir une copie de ces donn&eacute;es;</li>\n<li>Droit &agrave; la rectification des donn&eacute;es &agrave; caract&egrave;re personnel qui sont inexactes ou incompl&egrave;tes;</li>\n<li>Droit &agrave; l'effacement (\"droit &agrave; l'oubli\") des donn&eacute;es caract&egrave;re personnel, dans les conditions fix&eacute;es par l'article 17 du RGPD;</li>\n<li>Droit &agrave; la limitation du traitement des donn&eacute;es &agrave; caract&egrave;re personnel dans les conditions fix&eacute;es par l'article 18 du RGPD;</li>\n<li>Droit &agrave; la portabilit&eacute; des donn&eacute;es, c'est &agrave; dire que ces donn&eacute;es vous soient rendues ou qu'elles soient transmises &agrave; un autre responsable du traitement;</li>\n<li>Droit de s'opposer &agrave; tout moment au traitement : vous pouvez vous opposer au traitement de vos donn&eacute;es pour des raisons tenant &agrave; votre situation particuli&egrave;re. Vous disposez &eacute;galement du droit de vous opposer au traitement de vos donn&eacute;es &agrave; caract&egrave;re personnel &agrave; des fins de prospection commerciale (marketing direct);</li>\n<li>Droit de retirer votre consentement &agrave; tout moment : lorsque nous demandons votre consentement afin de vous contacter &eacute;lectroniquement (par emails, sms, etc.) &agrave; des fins de prospection commerciale, ainsi que pour l'utilisation des cookies, vous avez le droit de retirer ce consentement &agrave; tout moment.</li>\n<li>Droit d'introduire une r&eacute;clamation aupr&egrave;s de l'autorit&eacute; comp&eacute;tente.</li>\n</ul>\n<p>Vous pouvez d&eacute;poser plainte aupr&egrave;s de l'Autorit&eacute; de Protection des Donn&eacute;es (https://www.autoriteprotectiondonnees.be/introduire-une-requete-une-plainte) Vous pouvez nous contacter pour toute question ou pour mettre en oeuvre les droits qui pr&eacute;c&egrave;dent en nous envoyant un courrier &eacute;lectronique &agrave; l'adresse &eacute;lectronique suivante : rgpd@coverseal.com</p>\n<h2>8. Comment pouvez-vous &ecirc;tre inform&eacute; des changements apport&eacute;s &agrave; la pr&eacute;sente politique ?​</h2>\n<p>Nous nous r&eacute;servons le droit de modifier cette Politique Vie Priv&eacute;e &agrave; tout moment, veuillez donc la consulter fr&eacute;quemment. Les changements et les clarifications entreront en vigueur imm&eacute;diatement apr&egrave;s leur publication sur le site internet.</p>\n<p>Nous vous informerons de toute modification substantielle &agrave; la pr&eacute;sente Politique Vie Priv&eacute;e via notre site ou nos modes de communications habituels.</p>\n<h2>​9. Comment pouvez-vous nous contacter ?</h2>\n<p>Si vous avez des questions, commentaires ou pr&eacute;occupations concernant la pr&eacute;sente D&eacute;claration de protection des donn&eacute;es et/ou nos pratiques, vous pouvez nous contacter par courrier &eacute;lectronique &agrave; l&rsquo;adresse e-mail suivante : rgpd@coverseal.com</p>",
  };

  const home_template = {
    languages_code,
    seo_title: "Coverseal",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec velit neque.",
    main_title: "Une phrase accroche en une ou deux lignes",
    coverseal_title: "Une technologie fiable & brevetée",
    coverseal_paragraph:
      "La marque Coverseal est née de la volonté d’apporter une solution tant esthétique que performante pour une clientèle exigeante. Issue du monde de l’industrie et plus précisément des portes souples à ouverture rapide, cette technologie a été adaptée au milieu spécifique de la piscine. Le soin apporté au choix des matériaux rend nos couvertures de sécurité pour piscines réellement sûres et fiables.",
    coverseal_link_text: "En savoir +",
    gallery_link_text: "+ de pĥotos",
    models_title: "Notre gamme",
    models_link_text: "Personnalisez votre Coverseal",
    models_paragraph:
      "Vous pouvez personnaliser votre Coverseal vous-même grâce à notre configurateur en ligne. A la suite de cela, vous recevez un devis sur mesure.",
    configurator_link_text: "Configurer",
    scroll_down_link_text: "Scroll down",
  };

  const benefits_template = {
    languages_code,
    seo_title: "Ses avantages",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec velit neque.",
    main_title: "Avantages",
    security_title: "Securité",
    security_paragraph:
      "<p>Nos couvertures Coverseal sont conformes aux normes les plus exigeantes en mati&egrave;re de s&eacute;curit&eacute;, notamment &agrave; la NF P90-308 d&eacute;cembre 2013. Le grand soin apport&eacute; au choix des mat&eacute;riaux utilis&eacute;s et un syst&egrave;me de verrouillage exclusif permettent de s&eacute;curiser votre piscine efficacement et ce malgr&eacute; la taille et la forme de votre bassin. La grande r&eacute;sistance de la membrane en PVC pr&eacute;contraint de marque Serge Ferrari permettra de supporter le poids d&rsquo;une ou plusieurs personnes, notamment vos enfants et animaux.</p>",
    water_quality_title: "Qualité de l'eau",
    water_quality_paragraph:
      "<p>La qualit&eacute; des mat&eacute;riaux choisis, particuli&egrave;rement au sujet de la membrane et de l&rsquo;&eacute;tanch&eacute;it&eacute; que procure notre syst&egrave;me de verrouillage brevet&eacute; vous garantira une eau plus limpide et plus propre. Notre membrane, qui en toute circonstance reste parfaitement tendue, &eacute;vitera par exemple que les feuilles ne tombent dans votre piscine. Elle r&eacute;duira aussi fortement le ph&eacute;nom&egrave;ne de photosynth&egrave;se et par cons&eacute;quence le d&eacute;veloppement d&rsquo;algues.</p>\n<p>Les indices PH de votre piscine resteront alors plus stables en diminuant consid&eacute;rablement la consommation de produits chimiques pour le traitement de l&rsquo;eau. Vous obtiendrez ainsi un important avantage du point de vue &eacute;conomique et une baignade beaucoup plus agr&eacute;able et s&ucirc;re pour les adultes et les enfants. Finis les yeux irrit&eacute;s qui deviennent rouges, le tout en prot&eacute;geant aussi l&rsquo;environnement. Que dire du nettoyage quotidien qui sera lui aussi quasi inexistant.</p>",
    isolation_title: "Isolation",
    isolation_paragraph:
      "<p>Le co&ucirc;t de l&rsquo;&eacute;nergie et la volont&eacute; de mieux respecter l&rsquo;environnement sont des raisons de plus pour choisir une couverture de piscine Coverseal. En journ&eacute;e, les rayons du soleil chaufferont la couverture et l&rsquo;eau de la piscine gr&acirc;ce au transfert par rayonnement. La chaleur sera donc accumul&eacute;e par l&rsquo;eau de la piscine. La nuit, la couverture emp&ecirc;chera toute &eacute;vaporation, ce qui &eacute;vitera &agrave; l&rsquo;eau de se refroidir. Une &eacute;conomie en eau mais aussi en &eacute;nergie sera d&egrave;s lors r&eacute;alis&eacute;e. Lors des p&eacute;riodes plus froides, notre couverture limitera &eacute;galement l&rsquo;apparition de gel et permettra de prot&eacute;ger au mieux votre bassin et ses &eacute;quipements lors de l&rsquo;hivernage.</p>",
    models_link_text: "Découvrez les différents modèles",
  };

  const models_template = {
    languages_code,
    seo_title: "Modèles",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec velit neque.",
    main_title: "Modèles",
    main_paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec velit neque.",
    technical_information_title: "Infos techniques",
    technical_info_file_text: "Fiche technique",
    configurator_link_text: "Configurer",
    achievements_link_text: "Voir ce modèle chez nos clients",
    customization_title: "Une couverture de piscine personnalisable",
    customization_paragraph:
      "Coverseal vous permettra de préserver l’harmonie de votre piscine tout en s’adaptant parfaitement à son environnement dans les moindres détails.",
    customization_configurator_link_text: "Configurer",
    membrane_title: "La membrane",
    membrane_paragraph:
      "Toutes nos couvertures sont réalisées sur mesure et sont personnalisables. Une gamme de couleur pour la membrane permet à notre couverture de s’intégrer parfaitement et en toute discrétion à l’environnement de votre piscine.",
    dressing_title: "l'habillage",
    dressing_paragraph:
      "Coté habillage, plusieurs versions existent. Des côtés latéraux en acier inoxydable au caisson en aluminium thermolaqué dans la couleur de votre choix (RAL sauf fluo), là encore il s’agit bien d’un produit unique qui répondra à vos moindres attentes et envies.",
    options_title: "Options",
    options_paragraph:
      "Diverses options peuvent être ajoutées à votre couverture de piscine. Il existe par exemple un détecteur de fermeture automatique pour contrôler votre unité de production de traitement d’eau, une alimentation spécifique aux couvertures pour une piscine intérieure, l’ajout de vérins pour passer les obstacles importants ou optimiser l’étanchéité et l’esthétique… · option 1 · option 2 · option 3 · option 4",
    options_items: [
      { option_name: "option 1" },
      { option_name: "option 2" },
      { option_name: "option 3" },
    ],
    last_configurator_link_text:
      "Créez & visualisez votre Coverseal grâce à notre Configurateur",
    scroll_down_link_text: "Personnalisation",
  };

  const about_us_template = {
    languages_code,
    seo_title: "Qui sommes-nous ?",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.",
    main_title: "Qui sommes-nous ?",
    main_paragraph:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.",
    search_placeholder: "Recherche  - Mots clés",
    history_title: "Une histoire",
    history_paragraph:
      "<p>En cr&eacute;ant Coverseal en 2007, Benoit Coenraets profite de sa longue exp&eacute;rience dans le secteur industriel pour d&eacute;velopper une couverture de piscine garantissant s&eacute;curit&eacute;, fiabilit&eacute;, performances et esth&eacute;tisme &agrave; ses futurs clients. Il a notamment fond&eacute; en 1987 &laquo; Dynaco &raquo; qui a mis au point, fabriqu&eacute; et commercialis&eacute; &agrave; travers le monde (Europe, USA, Japon, Russie, &hellip;) des portes automatiques en PVC &agrave; ouverture rapide .</p>\n<p>Trois ann&eacute;es de recherche furent n&eacute;cessaires pour que cette couverture de piscine voie le jour avec la volont&eacute; d&rsquo;am&eacute;liorer le produit sans cesse. La Coverseal reste &agrave; ce jour in&eacute;gal&eacute;e tant ses avantages sont nombreux et que son esth&eacute;tique minimaliste s&rsquo;int&egrave;gre au mieux &agrave; l&rsquo;environnement de chaque piscine.</p>",
    company_title: "Une entreprise",
    company_paragraph:
      "Située à Strépy-Bracquegnies en Belgique, l’usine Coverseal est la pièce maîtresse de notre société. Tous nos produits sont développés en interne par notre équipe R&D tandis que notre infrastructure et notre personnel de production permettent une réalisation d’un très haut niveau. Précision et qualité sont des mots que nous ne prenons pas à la légère.",
    network_title: "Un réseau",
    network_paragraph:
      "La présence de Coverseal s’étend bien au-delà de la Belgique, pays dans lequel toutes nos couvertures sont fabriquées. Notre comptons à travers de nombreux pays des partenaires, dont voici les principaux :",
    partnership_link_text: "Devenir partenaire",
    the_coverseal_link_text: "Découvrez la Coverseal",
    achievements_link_text: "Voir la pose d'une Coverseal de A à Z",
  };

  const contact_template = {
    languages_code,
    seo_title: "Contacts",
    seo_description:
      "N’hésitez pas à nous contacter : un expert répondra à toutes vos questions.",
    main_title: "Contacts",
    main_paragraph:
      "<p>N’hésitez pas à nous contacter : un expert répondra à toutes vos questions.</p>",
    price_request_title: "Devis",
    price_request_paragraph:
      "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>",
    price_request_link_text: "Demander un devis",
    catalog_title: "Catalogue",
    catalog_paragraph:
      "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>",
    catalog_link_text: "Recevoir un catalogue",
    after_sale_service_title: "SAV",
    after_sale_service_paragraph:
      "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>",
    after_sale_service_link_text: "Contactez-nous",
    faq_link_text: "Question de la FAQ avec lien?",
  };

  const partnerships_template = {
    languages_code,
    seo_title: "Partenaires",
    seo_description:
      "Nous sommes à la recherche constante de partenaires à travers les différents pays et continents qui partagent les mêmes valeurs que nous, à savoir : précision, rigueur, qualité, réactivité et satisfaction client. Plusieurs schémas sont possibles pour collaborer avec nous :",
    main_title: "Partenaires",
    main_paragraph:
      "<p>Nous sommes à la recherche constante de partenaires à travers les différents pays et continents qui partagent les mêmes valeurs que nous, à savoir : précision, rigueur, qualité, réactivité et satisfaction client. Plusieurs schémas sont possibles pour collaborer avec nous :</p>",
    distributor_title: "Distributeur",
    distributor_paragraph:
      "<p>Vous avez la volonté de représenter notre marque, la commercialiser, installer nos produits et assurer leur suivi ?</p>",
    distributor_link_text: "Contactez-nous",
    dealer_title: "Revendeur",
    dealer_paragraph:
      "<p>Vous avez une force commerciale importante et êtes intéressés par la commercialisation de nos produits sans pour autant avoir la capacité d’installation et de service après-vente ?</p>",
    dealer_link_text: "Contactez-nous",
    lead_title: "Apporteurs d'affaires",
    lead_paragraph:
      "<p>Vous êtes en contact régulier avec de potentiels clients qui pourraient être intéressés par nos produits ?</p>",
    lead_link_text: "Contactez-nous",
    gallery_link_text: "+ de photos",
    faq_link_text: "Coverseal ou volet immergé ?",
  };

  const faq_template = {
    languages_code,
    seo_title: "F.A.Q.",
    seo_description: "The FAQ page to answer all your questions",
    main_title: "F.A.Q.",
    search_placeholder: "Recherche  - Mots clés",
    result_text: "Résultats de votre recherche",
    no_result_text:
      "Désolé, nous n'avons trouvé aucun résultat à votre recherche",
  };

  const jobs_template = {
    languages_code,
    seo_title: "Jobs",
    seo_description:
      "Nous sommes toujours à la recherche de nouveaux talents pour agrandir notre équipe.",
    main_title: "Coverseal is looking for",
    main_paragraph:
      "Nous sommes toujours à la recherche de nouveaux talents pour agrandir notre équipe.",
    interested_text: "Intêresée ?",
    send_your_cv_text:
      '<p>Envoyez votre <em>CV</em> &amp; <em>lettre de motivation</em> &agrave; l&rsquo;adresse mail suivante : <a title="" href="mailto:jobs@coverseal.com" target="_blank" rel="noopener">jobs@coverseal.com</a></p>',
    no_job_offer_text:
      "Désolé, nous n'avons aucune offre d'emploi pour le moment. Revenez plus tard !",
    back_to_jobs_text: "Retour aux jobs",
  };

  const after_sale_template = {
    languages_code,
    seo_title: "S.A.V.",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.",
    main_title: "S.A.V.",
  };

  const price_request_template = {
    languages_code,
    seo_title: "Demande de devis",
    seo_description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.",
    main_title: "Demande de devis",
  };

  const before_configurator_template = {
    languages_code,
    seo_title: "Une configuration en ligne accompagnée",
    seo_description:
      "Grâce à notre configurateur en ligne, vous pouvez personnaliser votre Coverseal comme vous le souhaitez. Une large gamme de choix s’offre à vous ! Et ne vous inquiétez pas, nos collaborateurs suivent votre projet & prendront contact avec vous en temps voulu.",
    main_title: "Une configuration en ligne accompagnée",
    main_paragraph:
      "Grâce à notre configurateur en ligne, vous pouvez personnaliser votre Coverseal comme vous le souhaitez. Une large gamme de choix s’offre à vous ! Et ne vous inquiétez pas, nos collaborateurs suivent votre projet & prendront contact avec vous en temps voulu.",
    configurator_link_text: "Configurer",
    start_sentence: "Voici comment ça marche :",
    content_step_1:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_2:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_3:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_4:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_5:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_6:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    content_step_7:
      "Configuration en quelques clics (environ 7 clics) de la couverture souhaitée par le client seul + ajout de photos de la piscine",
    configurator_last_link_text: "Configurer",
    models_link_text: "Voir les modèles de Coverseal",
    help_sentence: "Vous souhaitez de l’aide pour configurer votre Coverseal ?",
    contact_link_text: "Contactez-nous !",
  };

  // non single collection
  const faq_categories = [
    { languages_code, name: "Généralités" },
    { languages_code, name: "Questions pratiques" },
    { languages_code, name: "SAV" },
  ];

  const faq = [
    {
      languages_code,
      question: "Une question générale",
      content: "<p>Une explication g&eacute;n&eacute;rale</p>",
      keywords: ["Membrane", "Bâche", "Toile"],
    },
    {
      languages_code,
      question: "Une question pratique",
      content: "<p>Une explication pratique</p>",
      keywords: ["test", "piscine"],
    },
    {
      languages_code,
      question: "Une question pour le SAV",
      content: "<p>Une explication pour le SAV</p>",
      keywords: ["Automatique", "semi"],
    },
  ];

  const modelAutomatique = {
    languages_code,
    main_title: "Automatique",
    seo_title: "Automatique",
    seo_description:
      "La couverture Automatique est le fleuron de notre gamme en combinant technologie, esthétisme et respect de l’environnement. Actionné par une commande filaire ou sans fil (en conservant une vue sur le bassin), il vous assurera un confort optimal et vous permettra de découvrir ou de sécuriser votre bassin en moins d’une minute. Les batteries sont alimentées par des panneaux photovoltaïques totalement intégrés dans le coffre d’habillage, ce qui rend cette couverture totalement autonome. Le coffre, comme la membrane, sont personnalisables pour s’adapter au mieux à l’environnement de votre piscine . Coté performances, vous profiterez d’une eau plus propre, plus saine et plus chaude … La membrane restera parfaitement tendue pour une esthétique irréprochable et permettra également de limiter la photosynthèse, raison principale de la prolifération d’algues. Cette couverture est le choix de clients exigeants qui ne veulent pas faire de compromis entre esthétique et performances.",
    product_description:
      "La couverture Automatique est le fleuron de notre gamme en combinant technologie, esthétisme et respect de l’environnement. Actionné par une commande filaire ou sans fil (en conservant une vue sur le bassin), il vous assurera un confort optimal et vous permettra de découvrir ou de sécuriser votre bassin en moins d’une minute. Les batteries sont alimentées par des panneaux photovoltaïques totalement intégrés dans le coffre d’habillage, ce qui rend cette couverture totalement autonome. Le coffre, comme la membrane, sont personnalisables pour s’adapter au mieux à l’environnement de votre piscine . Coté performances, vous profiterez d’une eau plus propre, plus saine et plus chaude … La membrane restera parfaitement tendue pour une esthétique irréprochable et permettra également de limiter la photosynthèse, raison principale de la prolifération d’algues. Cette couverture est le choix de clients exigeants qui ne veulent pas faire de compromis entre esthétique et performances.",
    technical_information: [
      { text: "Sur mesure" },
      { text: "Systeme automatique" },
      { text: "X combinaisons de couleurs possibles" },
      { text: "épaisseur membrane · 0,5 MM" },
      { text: "spécificité · ouverture à distance" },
      { text: "budget maitrisé" },
      { text: "avec coffret d’habillage" },
    ],
  };

  const models = [
    {
      ...modelAutomatique,
    },
    {
      ...modelAutomatique,
      main_title: "Semi-automatique",
      seo_title: "Semi-automatique",
    },
    {
      ...modelAutomatique,
      main_title: "Manual",
      seo_title: "Manual",
    },
  ];

  const achievements_sections = [
    // julie and maxime
    undefined,
    {
      languages_code,
      content:
        "<h3>NOTE</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>",
    },
    {
      languages_code,
      content:
        "<h2>01</h2>\n<h3>MESURAGE</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
    },
    {
      languages_code,
      content:
        "<h2>02</h2>\n<h3>&eacute;tape deux</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
    },
    {
      languages_code,
      content:
        "<h2>03</h2>\n<h3>&eacute;tape trois</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
    },
    {
      languages_code,
      content:
        "<h2>04</h2>\n<h3>&eacute;tape 4</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
    },
    undefined,
    {
      languages_code,
      content:
        "<h2>05</h2>\n<h3>etape cinq</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
    },
    // louise and martin
    {
      languages_code,
      content:
        "<h3>Quelques mots</h3>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>",
    },
    {
      languages_code,
      content:
        "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>",
    },
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  const achievements = [
    {
      languages_code,
      seo_title: "Louise & Martin",
      seo_description: "Louise & Martin",
      main_title: "Louise & Martin",
      project_text: "Projet de",
    },
    {
      languages_code,
      seo_title: "Julie & Maxime",
      seo_description: "Julie & Maxime",
      main_title: "Julie & Maxime",
      project_text: "Projet de",
    },
  ];

  const achievements_categories = [
    {
      languages_code,
      main_title: "De A à Z",
      seo_title: "De A à Z",
      seo_description: "De A à Z",
    },
    {
      languages_code,
      main_title: "Inspirations",
      seo_title: "Inspirations",
      seo_description: "Inspirations",
    },
  ];

  const defaultJob = {
    languages_code,
    main_title: "Assitant marketing",
    seo_title: "Assitant marketing",
    seo_description: "Une description",
    content:
      "<h2>Description</h2>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>\n<h2>Profile</h2>\n<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum :</p>\n<ul>\n<li>magna aliquam</li>\n<li>ullamcorper suscipit lobortis</li>\n<li>consectetuer</li>\n<li>laoreet dolore magna</li>\n<li>aliquam</li>\n</ul>",
  };

  const jobs = [
    { ...defaultJob },
    { ...defaultJob, main_title: "Project manager" },
    { ...defaultJob, main_title: "Technicien d'usine" },
  ];

  const singleCollections = {
    global,
    the_coverseal_template,
    achievements_template,
    page_not_found_template,
    privacy_policy_template,
    terms_and_conditions_template,
    home_template,
    benefits_template,
    models_template,
    about_us_template,
    contact_template,
    partnerships_template,
    faq_template,
    jobs_template,
    after_sale_template,
    price_request_template,
    before_configurator_template,
  };

  const nonSingleCollections = {
    faq_categories,
    faq,
    models,
    achievements_categories,
    achievements,
    jobs,
    achievements_sections,
  };

  return {
    singleCollections,
    nonSingleCollections,
  };
}
