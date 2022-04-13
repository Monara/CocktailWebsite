import './Text.css';
import tools from "../imgs/tools.png";

/*translation object for inserting phrases*/
export const text = {
    title: ['The Cocktail Party', 'Kokteilių vakarėlis'],
    subtitle: ['Classic cocktail recipes', 'Klasikinių kokteilių receptai'],
    search: ['Search', 'Paieška'],
    other_lang: ['LT', 'EN'],
    max3: ['max. 3 ingredients', '3 ingredientai ar mažiau'],
    veg: ['vegan', 'veganiški'],
    bytitle: ['By title', 'Pagal pavadinimą'],
    bytag: ['By ingredient', 'Pagal ingredientą'],
    less: ['Less', 'Mažiau'],
    more: ['More', 'Daugiau'],
    search: ['Search ', 'Ieškoti '],
    tab1: ['Ingredients', 'Ingredientai'],
    tab2: ['Details', 'Detalės'],
    rand: ['Random cocktail:', 'Atsitiktinis kokteilis:'],
    instr: ['Instructions', 'Gamyba'],
    glass: ['Glass: ', 'Taurė: '],
    src: ['Source: ', 'Šaltinis: '],
    no_res: ['No results found', 'Rezultatų nėra']
};

export const EngText = () => {
    return (
        <div>
            <div className='section'>
                <h3>Bar tools</h3>
                <p>The main tools used in making cocktails are the shaker, bar strainer, jigger, bar spoon, muddler, citrus fruit juicer, and peeler.</p>
                <img src={tools} id='tools-img' alt='' />
                <p><b>Shakers</b> are usually made of stainless steels. Traditionally they consist of three parts. Two-part (Boston) shakers lack a strainer. The bottom part of shakers can be used for cocktails that only require mixing.</p>
                <p><b>Bar strainers</b> can look like small regular strainers, or like steel spatulas with a metal spiral stretch around the side. Cocktails that include fresh juice usually require straining.</p>
                <p><b>A jigger</b> is a steel or copper double-sided measuring tool. Typically, one side is twice as big in volume as the other, for instance, 15 ml and 30 ml, 20 ml and 40 ml, and so on.</p>
                <p><b>A bar spoon</b> has the same volume (5 ml) as a typical spoon, but it has a very long handle for mixing drinks.</p>
                <p><b>A muddler</b> is used to muddle (crush) various ingredients, such as fruit or herbs, in order to release the aroma and juice.</p>
            </div>
            <div className='section'>
                <h3>Types of glasses</h3>
                <p><b>Cocktail (Martini) glass</b> is a cone-shaped glass with a long stem. Straight up (no ice) drinks are served in it. Its volume ranges from 90 ml to 300 ml.</p>
                <p><b>Old fashioned (lowball) glass</b> is a short stemless glass that is used for both straight up and on the rocks drinks. It is typically between 180 ml and 300 ml in volume.</p>
                <p><b>Highball glass</b>is typically between 240 ml to 350 ml in volume, 7 cm is diameter.  Collins glass is a similar, but taller and narrower version of the highball glass. Its volume ranges between 300-400 ml.  These glasses are usually used for serving mixed drinks with ice. Carbonated drinks, such as soda or soda water, are common ingredients.</p>
                <p><b>Poco grande glass</b> is a uniquely shaped glass with 340 ml in volume. Its narrower version is known as a hurricane glass. It is larger in volume and has a much shorter stem.</p>
                <p>Other types of glasses are also used in serving cocktails: various tumblers, wine glasses, champagne flutes. Some drinks are also served in cups, which can be made of glass (for the Irish coffee) or copper (for the Moscow Mule). Margaritas are often served in specific margarita glasses.</p>
            </div>
            <div className='section'>
                <h3>Types of cocktails</h3>

                <h4>Old cocktails (known already in mid-19th century)</h4>

                <p><b>A flip</b> is a drink, traditionally made with eggs, sugar, and nutmeg. It used to be served warm.</p>
                <p><b>A julep</b> is a drink of American origin. It is usually made with mint, white sugar, shaved ice, and various types of alcohol. A typical julep consisted of 15 ml sugar, 40 ml water, a few sprigs of mint, and 30 ml alcohol (cognac, brandy, gin, or whiskey).</p>
                <p><b>A cocktail</b> used to refer to a drink made of alcohol (brandy, whiskey, or champagne), sugar or syrup, bitters, and lemon peel. These days such drinks are known as ancestrals, as it's one of the oldest types of mixed drinks. Sazerac, Old-Fashioned, and Champagne Cocktail belong to this category.</p>
                <p><b>A crusta</b> is similar to an ancestral cocktail, but it is served in a fancier way. The inside of a glass is covered with lemon peel, the glass also has a sugar rim.</p>
                <p><b>Punch</b> has many variations. It used to be served hot or cold, with various or even multiple types of alcohol. It included sugar, water, lemons, and various types of fruit.</p>
                <p><b>A sour</b> is a  sour-sweet cocktail made with various types of alcohol, lemon juice, sugar and water, or syrup.</p>
                
                <h4>Newer cocktails</h4>

                <p>Cocktail variety increased once various liquers and vermouth were created. Many cocktails appeared also during the Prohibition in order to mask the low quality of alcohol. Since gin was easier to make and come by, it comes up in many classic cocktails.</p>
                <p><b>Duos and trios</b> are cocktails based on two types of alcohol, and sometimes include bitters. The Rusty Nail and the French Connection are examples of duos. Trios tend to call for cream, as Alexander and White Russian do.</p>
                <p><b>Highballs</b> are mixed drinks served in tall glasses filled with ice. They usually include carbonated drinks. Cuba Libre and Dark 'n' Stormy are examples of this category.</p>
                <p><b>Fizzes</b> are fizzy drinks, similar to highballs, although they include egg whites and are served without ice.</p>
                <p>There are more types of cocktails, such as hot drinks, tropical cocktails, and so on.</p>
            </div>
            <div className='section'>
                <h3>Recipe sources</h3>
                <p>The primary source for this database is International Bartenders' Association (IBA). This organization started standardizing classic cocktail recipes already in 1961.</p>
            </div>
      </div>
    );
};

export const LtText = () => {
    return (
        <div>
            <div className='section'>
                <h3>Baro įrankiai</h3>
                <p>Kokteilių gamybai reikalinga plaktuvė, baro koštuvėlis, menzūrėlė (džigeris), baro šaukštas, grūstuvas (mudleris), rankinė citrusų sulčiaspaudė, skutukas.</p>
                <img src={tools} id='tools-img' alt='' />
                <p><b>Plaktuvės</b> dažnai gaminamos iš nerūdijančio plieno. Jos gali būti trijų arba dviejų  dalių (Bostono). Bostono plaktuvės neturi koštuvėlio, tad jį būtina įsigyti atskirai. Apatinė plaktuvės dalis galima būti naudojama kokteiliams, kuriuos vietoj plakimo tereikia sumaišyti.</p>
                <p><b>Baro koštuvėliai</b> gali atrodyti ir kaip nedideli standartiniai koštuvai, ir kaip plieninė mentelė, spirale apsuktu kraštu. Kokteiliai su šviežiomis sultimis dažniausiai turi būti perkošti prieš patiekiant.</p>
                <p><b>Menzūrėlė (džigeris)</b> – tai dvipusis plieninis ar varinis tūrio matuoklis. Paprastai vienos pusės talpa yra dvigubai didesnė nei kitos, pvz., 15 ml ir 30 ml, 20 ml ir 40 ml, ir t.t.</p>
                <p><b>Baro šaukštas</b> – tai tipinės 5 ml talpos šaukštelis itin ilga rankenėle. Skirtas kokteilių maišymui.</p>
                <p><b>Grūstuvas (mudleris)</b> naudojamas įvairiems ingredientams (vaisiams, žolelėms) sutrinti. „Mochito“ gamyboje naudojamas mėtoms, o „Kaipirinjai“ žaliosioms citrinoms sutrinti.</p>
            </div>
            <div className='section'>
                <h3>Stiklinių rūšys</h3>
                <p><b>Kokteilinė (martinio) taurė</b> – tai kūgio formos taurė ant kojelės, kurioje gėrimai patiekiami be ledo. Taurės talpa: 90-300 ml.</p>
                <p><b>Viskio taurė</b> (angl. <em>old fashioned glass, lowball glass</em>) – tai žema taurė be kojelės. Gėrimai gali būti patiekiami su ledu ar be. Talpa: 180-300 ml.</p>
                <p><b>Aukšta stiklinė</b> (angl. <em>highball glass</em>). Jos talpa 240-350 ml, tipinis skersmuo 7 cm. Taip pat naudojama ir aukštesnė, siauresnė Kolinso (angl. <em>Collins</em>) taurė. Jos talpa 300-400 ml, tipinis skersmuo 6 cm. Šiose stiklinėse patiekiami maišyti gėrimai su ledu, dažnai į sudėti įeina gazuoti gėrimai (limonadai, sodos vanduo).</p>
                <p><b>Poco grande taurė</b> – tai netradicinės formos, 340 ml talpos stiklinė, dažnai naudojama tropiniams kokteiliams. Siauresnis jos variantas (angl. <em>hurricane</em>) yra didesnės talpos ir turi žemesnę kojelę.</p>
                <p></p>
            </div>
            <div className='section'>
                <h3>Kokteilių rūšys</h3>

                <h4>Seni kokteiliai (gerti jau XIX amžiaus viduryje)</h4>

                <p><b>Flipas</b> (angl. <em>flip</em>) – tai gėrimas, tradiciškai gaminamas su kiaušiniais, cukrumi, muskatu. Anksčiau būdavo patiekiamas šiltas.</p>
                <p><b>Džiulepas</b> (angl. <em>julep</em>) – amerikietiškos kilmės kokteilis, į kurio sudėtį įeina mėtos, baltasis cukrus, ir smulkintas ledas. Jis gaminamas su įvairių rūšių alkoholiu. Tipinis receptas susidarytų iš 15 ml cukraus, 40 ml vandens, kelių šakelių mėtų, ir 30 ml alkoholio (konjako, brendžio, džino, ar viskio).</p>
                <p><b>Kokteilis</b> (angl. <em>cocktail</em>). Pagal senąją žodžio reikšmę, kokteilis susidėjo iš alkoholio (brendžio, viskio, šampano), cukraus ar sirupo, biterio, citrinos žievelės. Šiais laikais ši rūšis vadinama paveldo kokteiliais. Šiai kategorijai priklauso „Sazerakas“, „Senovinis“ (angl. <em>Old-Fashioned</em>), „Šampano kokteilis“.</p>
                <p><b>Krusta</b> (angl. <em>crusta</em>) – tai panašus gėrimas į kokteilį, bet įmantresniu patiekimu. Taurės vidus išklojamas visos citrinos žieve, o taurės kraštai prikibdomi cukraus. </p>
                <p><b>Punšas</b> – viena seniausių kokteilio atmainų. Tai daug įvairovės turintis gėrimas: jį galima patiekti ir karštą, ir šaltą, įvairiu ar net kelių rūšių alkoholiu. Dažniausiai į sudėtį įeidavo cukrus, vanduo, citrinos, bei įvairūs vaisiai.</p>
                <p><b>Rūgštusis</b> (saueris, angl. <em>sour</em>) – tai saldžiai rūgštus kokteilis, gaminamas su įvairiu alkoholiu, citrinos sultimis, cukrumi ir vandeniu, arba sirupu.</p>
                
                <h4>Naujesni kokteiliai</h4>

                <p>Kokteilių įvairovė išaugo atsiradus vermutui ir įvairiems likeriams. Daug kokteilių atsirado ir prohibicijos laikotarpiu, norint paslėpti žemą alkoholio kokybę. Kadangi džiną tuomet buvo pagaminti lengviau, jis įeina į didžiulę dalį klasikinių kokteilių.</p>
                <p><b>Duetai, tercetai</b> (angl. <em>duos, trios</em>) – tai kokteiliai, kurių pagrindą sudaro dviejų rūšių alkoholis, kartais pasitaiko ir biterių. „Surūdijusi vinis“ ir „Prancūzų ryšininkas“ yra duetų pavyzdžiai. Tercetai sudėtyje turi ir grietinėlės (pavydžiui, „Aleksandras“, „Baltasis rusas“).</p>
                <p><b>Haibolas</b> (angl. <em>highball</em>) – tai maišyti gėrimai, patiekiami aukštose stiklinėse su ledu. Į jų sudėtį dažnai įeina gazuoti nealkoholiniai gėrimai. Šios rūšies pavydžiais būtų „Cuba Libre“, „Tamsu ir audringa“.</p>
                <p><b>Putojantysis</b> (fizas, angl. <em>fizz</em>) sudėtimi panašus į haibolo kokteilį, bet gaminamas su kiaušinio baltymu ir patiekiamas be ledo.</p>
                <p>Taip pat pasitaiko karštų gėrimų, tropinių kokteilių, ir t.t.</p>
            </div>
            <div className='section'>
                <h3>Receptų šaltiniai</h3>
                <p>Pagrindinis šios duomenų bazės šaltinis yra Tarptautinė Barmenų Asosiacija (angl. IBA). Ši organizacija pradėjo standartizuoti klasikinių kokteilių receptus jau 1961 metais.</p>
            </div>
      </div>
    );
};
