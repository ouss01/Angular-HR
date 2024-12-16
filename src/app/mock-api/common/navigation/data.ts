/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Gestion Administratives et Gestion Des Carrières',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.Organigramme',
                title: 'Organigramme',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboards/organigram',
            },
            {
                id   : 'dashboards.Dashboard Des Employées',
                title: 'Dashboard Des Employées',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/employees',
            },
            {
                id   : 'dashboards.Onboarding',
                title: 'Onboarding',
                type : 'basic',
                icon : 'heroicons_outline:banknotes',
                link : '/dashboards/onBoarding',
            },
            {
                id   : 'dashboards.Gestion des employées',
                title: 'Gestion des employées',
                type : 'collapsable',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/employeesManagement',
                children: [
            
                    {
                        id   : 'apps.Ajout Des Employées',
                        title: 'Ajout Des Employées',
                        type : 'basic',
                        icon : 'heroicons_outline:user-group',
                        link : '/dashboards/employeesManagement',
                    },
                ]
                
            },
            {
                id   : 'dashboards.Gestion des employées',
                title: 'Gestion des Carriéres',
                type : 'collapsable',
                icon : 'heroicons_outline:user-group',
                 link : 'apps/contacts',
                children: [
            
                    {
                        id   : 'apps.Ajout Des Employées',
                        title: 'Gestion des promotions',
                        type : 'basic',
                        icon : 'heroicons_outline:user-group',
                        link : '/apps/promotion',
                    },          
                    {
                        id   : 'apps.Ajout Des Employées',
                        title:  ' Gestion des fins d’activité / retraites ',
                        type : 'basic',
                        icon : 'heroicons_outline:user-group',
                        link : '/apps/fin-activity',
                       
                    },
                    {
                        id   : 'apps.Ajout Des Employées',
                        title:  ' Gestion des Handicapés ',
                        type : 'basic',
                        icon : 'heroicons_outline:user-group',
                        link : '/apps/handicap',
                       
                    },
                ]
                
            },

            {
                id   : 'dashboards.Gestion des Postes',
                title: 'Gestion des Postes',
                type : 'collapsable',
                icon : 'heroicons_outline:briefcase',
                 link : 'apps/contacts',
                children: [
            
                    {
                        id   : 'apps.poste',
                        title: 'Postes',
                        type : 'basic',
                        icon : 'heroicons_outline:arrow-up-circle',
                        link : '/apps/poste',
                    },  
                    {
                        id   : 'apps.contract',
                        title: 'Contrats',
                        type : 'basic',
                        icon : 'heroicons_outline:arrow-up-circle',
                        link : '/apps/contract',
                    },           
                   
                ]
                
            },
        ],
    },
   
    
    
    
    
    
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        tooltip : 'Apps',
        type    : 'aside',
        icon    : 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        tooltip : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        tooltip : 'UI',
        type    : 'aside',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation',
        tooltip : 'Navigation',
        type    : 'aside',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'DASHBOARDS',
        type    : 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'APPS',
        type    : 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id   : 'others',
        title: 'OTHERS',
        type : 'group',
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'User Interface',
        type    : 'aside',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation Features',
        type    : 'aside',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        type    : 'group',
        icon    : 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        type    : 'group',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Misc',
        type    : 'group',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
