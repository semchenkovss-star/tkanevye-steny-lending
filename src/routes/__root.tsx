import {useEffect, type ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import appCss from "@/index.css?url";
import CookieNotice from "@/components/site/CookieNotice";
import MetrikaPageView from "@/components/MetrikaPageView";
import {initPhoneTracking} from "@/lib/metrika";
import {captureAdSource} from "@/lib/adSource";
import {CityProvider} from "@/lib/city";
import CityHint from "@/components/site/CityHint";
import PageNotFound from "@/pages/PageNotFound";

// Заголовок, описание, og-теги и canonical каждая страница задаёт сама
// через компонент Seo — здесь только общее для всего сайта.
const ORG_LD = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ImageObject",
            "@id": "https://fabricwall.ru/#logo",
            url: "https://fabricwall.ru/logo.png",
            contentUrl: "https://fabricwall.ru/logo.png",
            width: 512,
            height: 512,
            caption: "Fabric Wall",
            inLanguage: "ru-RU",
        },
        {
            "@type": "Organization",
            "@id": "https://fabricwall.ru/#organization",
            name: "Fabric Wall",
            legalName: "ИП Семченков С. С.",
            url: "https://fabricwall.ru/",
            logo: {"@id": "https://fabricwall.ru/#logo"},
            image: {"@id": "https://fabricwall.ru/#logo"},
            telephone: "+7 (495) 797-08-09",
            email: "***",
            taxID: "325502907547",
            vatID: "323320000023952",
            description:
                "Установка натяжных тканевых стен и потолков на скрытом каркасе. Тихие стены со звукопоглощением, монтаж за 1–2 дня без пыли и мокрых работ. Работаем по России.",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Переведеновский пер., д. 3",
                addressLocality: "Москва",
                addressRegion: "Москва",
                addressCountry: "RU",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7 (495) 797-08-09",
                contactType: "sales",
                areaServed: "RU",
                availableLanguage: "Russian",
                hoursAvailable: "Пн–Сб, 9:00–20:00",
            },
            sameAs: [
                "https://vk.ru/tihie_steni",
                "https://youtube.com/@tixiesteny",
                "https://rutube.ru/u/tihiesteni/",
                "https://t.me/tixie_steny",
                "https://max.ru/id325502907547_biz",
            ],
            areaServed: {"@type": "Country", name: "Россия"},
        },
        {
            "@type": "WebSite",
            "@id": "https://fabricwall.ru/#website",
            name: "Fabric Wall",
            url: "https://fabricwall.ru/",
            inLanguage: "ru-RU",
            publisher: {"@id": "https://fabricwall.ru/#organization"},
        },
    ],
};

const METRIKA_1 = `(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments)
    };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
            return;
        }
    }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(101026698, "init", {
    trustedDomains: ["poehali.dev"],
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true
});`;

const METRIKA_2 = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112376085', 'ym');

ym(112376085, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover"},
            {name: "author", content: "Fabric Wall"},
            {name: "theme-color", content: "#F7F4F0"},
            {name: "format-detection", content: "telephone=no"},
            {name: "geo.region", content: "RU"},
            {name: "yandex-verification", content: "41351639538cba17"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "icon", href: "https://fabricwall.ru/favicon.ico", type: "image/x-icon"},
            {rel: "shortcut icon", href: "https://fabricwall.ru/favicon.ico", type: "image/x-icon"},
            {rel: "icon", type: "image/png", sizes: "32x32", href: "https://fabricwall.ru/favicon-32x32.png"},
            {rel: "icon", type: "image/png", sizes: "16x16", href: "https://fabricwall.ru/favicon-16x16.png"},
            {rel: "icon", type: "image/png", sizes: "120x120", href: "https://fabricwall.ru/favicon-120x120.png"},
            {rel: "icon", type: "image/png", sizes: "192x192", href: "https://fabricwall.ru/icon-192.png"},
            {rel: "icon", type: "image/svg+xml", href: "https://fabricwall.ru/favicon.svg"},
            {rel: "apple-touch-icon", sizes: "180x180", href: "https://fabricwall.ru/apple-touch-icon.png"},
            {rel: "manifest", href: "/site.webmanifest"},
            {rel: "preconnect", href: "https://cdn.poehali.dev"},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Golos+Text:wght@400;500;600;700&display=swap",
            },
            {rel: "image_src", href: "https://fabricwall.ru/logo.png"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(ORG_LD)},
            {children: METRIKA_1},
            {children: METRIKA_2},
        ],
    }),
    component: RootComponent,
    notFoundComponent: PageNotFound,
});

function RootComponent() {
    useEffect(() => {
        captureAdSource();
        initPhoneTracking();
    }, []);

    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <CityProvider>
                    <MetrikaPageView/>
                    <CityHint/>
                    <Outlet/>
                    <CookieNotice/>
                </CityProvider>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/101026698" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
            <div><img src="https://mc.yandex.ru/watch/112376085" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
