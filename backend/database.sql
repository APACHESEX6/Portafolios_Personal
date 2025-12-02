--
-- PostgreSQL database dump
--

\restrict hT3UNZSrj7Ur77u0B418y5eRSpYCulcoIL4igQQqzaEc6W1MdCsaHEdetHgHD4R

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-12-02 15:07:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 25390)
-- Name: contactmessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contactmessages (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    asunto character varying(255) NOT NULL,
    mensaje text NOT NULL,
    leido boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contactmessages OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25389)
-- Name: contactmessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contactmessages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contactmessages_id_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 225
-- Name: contactmessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contactmessages_id_seq OWNED BY public.contactmessages.id;


--
-- TOC entry 220 (class 1259 OID 25346)
-- Name: educations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educations (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    institucion character varying(255) NOT NULL,
    periodo character varying(100) NOT NULL,
    descripcion text NOT NULL,
    estado character varying(50) DEFAULT 'Completado'::character varying,
    destacados jsonb DEFAULT '[]'::jsonb,
    icono character varying(50) DEFAULT 'fa-graduation-cap'::character varying,
    orden integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT educations_estado_check CHECK (((estado)::text = ANY ((ARRAY['En Curso'::character varying, 'Completado'::character varying])::text[])))
);


ALTER TABLE public.educations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25345)
-- Name: educations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.educations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.educations_id_seq OWNER TO postgres;

--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 219
-- Name: educations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.educations_id_seq OWNED BY public.educations.id;


--
-- TOC entry 222 (class 1259 OID 25362)
-- Name: experiences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    puesto character varying(255) NOT NULL,
    empresa character varying(255) NOT NULL,
    periodo character varying(100) NOT NULL,
    descripcion text NOT NULL,
    estado character varying(50) DEFAULT 'Completado'::character varying,
    tecnologias jsonb DEFAULT '[]'::jsonb,
    "logoEmpresa" character varying(255),
    orden integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT experiences_estado_check CHECK (((estado)::text = ANY ((ARRAY['En Curso'::character varying, 'Completado'::character varying, 'Certificado'::character varying])::text[])))
);


ALTER TABLE public.experiences OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25361)
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experiences_id_seq OWNER TO postgres;

--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 221
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- TOC entry 218 (class 1259 OID 25333)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    profesion character varying(255) NOT NULL,
    "descripcionCorta" text NOT NULL,
    "descripcionLarga" text NOT NULL,
    "imagenPerfil" character varying(255) NOT NULL,
    "logoImagen" character varying(255),
    "tipoDocumento" character varying(100),
    "numeroDocumento" character varying(100),
    edad integer,
    "fechaNacimiento" character varying(100),
    "tipoSangre" character varying(10),
    nacionalidad character varying(100),
    idiomas jsonb DEFAULT '[]'::jsonb,
    email character varying(255) NOT NULL,
    telefono character varying(50),
    ubicacion character varying(255),
    "redesSociales" jsonb DEFAULT '{}'::jsonb,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25332)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profiles_id_seq OWNER TO postgres;

--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 217
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 224 (class 1259 OID 25377)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    porcentaje integer NOT NULL,
    categoria character varying(50) NOT NULL,
    icono character varying(100) NOT NULL,
    color character varying(20) DEFAULT '#4361ee'::character varying,
    orden integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT skills_categoria_check CHECK (((categoria)::text = ANY ((ARRAY['Frontend'::character varying, 'Backend'::character varying, 'Database'::character varying, 'Tools'::character varying, 'Other'::character varying])::text[]))),
    CONSTRAINT skills_porcentaje_check CHECK (((porcentaje >= 0) AND (porcentaje <= 100)))
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25376)
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_id_seq OWNER TO postgres;

--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 223
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- TOC entry 4785 (class 2604 OID 25393)
-- Name: contactmessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactmessages ALTER COLUMN id SET DEFAULT nextval('public.contactmessages_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 25349)
-- Name: educations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations ALTER COLUMN id SET DEFAULT nextval('public.educations_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 25365)
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 25336)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 25380)
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- TOC entry 4963 (class 0 OID 25390)
-- Dependencies: 226
-- Data for Name: contactmessages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contactmessages (id, nombre, email, asunto, mensaje, leido, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4957 (class 0 OID 25346)
-- Dependencies: 220
-- Data for Name: educations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.educations (id, titulo, institucion, periodo, descripcion, estado, destacados, icono, orden, "createdAt", "updatedAt") FROM stdin;
1	Tecnología en Desarrollo de Software	Universidad del Valle	2025 - Presente	Desarrollo de software, arquitectura de sistemas, bases de datos y metodologías ágiles. Participación en proyectos de investigación y desarrollo de aplicaciones web con tecnologías modernas.	En Curso	["Promedio: 4.0/5.0", "Proyectos destacados", "Liderazgo estudiantil"]	fa-graduation-cap	1	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
2	Bachillerato Académico	Institución Educativa Liceo Mixto	2016 - 2021	Formación integral con énfasis en ciencias y matemáticas. Participación en olimpiadas académicas y actividades de liderazgo estudiantil.	Completado	["Promedio: 4.5/5.0", "Mejor promedio en el colegio"]	fa-school	2	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
\.


--
-- TOC entry 4959 (class 0 OID 25362)
-- Dependencies: 222
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiences (id, puesto, empresa, periodo, descripcion, estado, tecnologias, "logoEmpresa", orden, "createdAt", "updatedAt") FROM stdin;
1	Desarrollador Full Stack en Angular	Universidad del Valle	2025 - Presente	Desarrollo de aplicaciones web empresariales utilizando Angular como framework principal. Implementación de arquitecturas escalables, integración con APIs RESTful, y desarrollo de componentes reutilizables. Trabajo en equipo bajo metodologías ágiles y despliegue continuo.	En Curso	["Angular 17+", "TypeScript", "RxJS", "Material Design"]	\N	1	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
2	Desarrollador Full Stack	Universidad del Valle	2025 - Presente	Desarrollo de aplicaciones web modernas con React y Node.js. Integración de APIs RESTful, gestión de bases de datos SQL y NoSQL. Implementación de buenas prácticas de desarrollo y automatización de procesos mediante CI/CD.	En Curso	["React", "Node.js", "PostgreSQL", "MongoDB", "CI/CD"]	\N	2	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
3	Reto Sevilla GeoEspacial	Universidad del Valle	2024	Participación en el desafío de innovación territorial organizado por la Universidad del Valle, enfocado en el desarrollo de soluciones geoespaciales para el Eje Cafetero. Trabajo con tecnologías de Esri (ArcGIS) y datos satelitales de la NASA para crear mapas inteligentes y análisis territoriales que contribuyan al desarrollo sostenible de la región cafetera colombiana.	Certificado	["Esri ArcGIS", "NASA Earth Data", "Geoespacial", "Inteligencia Territorial"]	\N	3	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
\.


--
-- TOC entry 4955 (class 0 OID 25333)
-- Dependencies: 218
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, nombre, apellidos, profesion, "descripcionCorta", "descripcionLarga", "imagenPerfil", "logoImagen", "tipoDocumento", "numeroDocumento", edad, "fechaNacimiento", "tipoSangre", nacionalidad, idiomas, email, telefono, ubicacion, "redesSociales", "createdAt", "updatedAt") FROM stdin;
1	Diego Alejandro	Lesmes Ordóñez	Ingeniero en Sistemas y Desarrollador web	Desarrollador Full Stack especializado en tecnologías modernas. Apasionado por crear soluciones innovadoras y escalables.	Estudiante de Tecnología en Desarrollo de Software en la Universidad del Valle. Con experiencia en desarrollo Full Stack, me especializo en crear aplicaciones web modernas utilizando React, Node.js y bases de datos tanto SQL como NoSQL. Apasionado por aprender nuevas tecnologías y resolver problemas complejos. Busco constantemente mejorar mis habilidades y contribuir a proyectos innovadores que generen un impacto positivo.	https://i.postimg.cc/28vtTs7D/Whats-App-Image-2025-08-30-at-8-43-38-AM.jpg	https://st2.depositphotos.com/2793243/9112/v/450/depositphotos_91122938-stock-illustration-hand-drawn-raccoon.jpg	Cédula	1.115.574.315	21	6 de julio del 2004	O+	Colombiano	[{"icono": "fas fa-language", "nivel": "Nativo", "nombre": "Español"}, {"icono": "fas fa-globe-americas", "nivel": "B1", "nombre": "Inglés"}]	diego.lesmes@correounivalle.edu.co	+57 314 865 8895	Sevilla, Colombia	{"github": "https://github.com/APACHESEX6", "twitter": "#", "linkedin": "https://www.linkedin.com/in/tu-perfil", "instagram": "#"}	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
\.


--
-- TOC entry 4961 (class 0 OID 25377)
-- Dependencies: 224
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (id, nombre, porcentaje, categoria, icono, color, orden, "createdAt", "updatedAt") FROM stdin;
1	HTML5	60	Frontend	fab fa-html5	#e34f26	1	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
2	CSS3	60	Frontend	fab fa-css3-alt	#2965f1	2	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
3	JavaScript	40	Frontend	fab fa-js	#f7df1e	3	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
4	React	50	Frontend	fab fa-react	#61dafb	4	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
5	Angular	55	Frontend	fab fa-angular	#dd0031	5	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
6	Python	60	Backend	fab fa-python	#3776ab	1	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
7	Node.js	40	Backend	fab fa-node-js	#68a063	2	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
8	Express	45	Backend	fas fa-server	#000000	3	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
9	PostgreSQL	50	Database	fas fa-database	#336791	1	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
10	MongoDB	50	Database	fas fa-database	#47A248	2	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
11	MySQL	50	Database	fas fa-database	#00758F	3	2025-12-02 15:05:04.269626-05	2025-12-02 15:05:04.269626-05
\.


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 225
-- Name: contactmessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contactmessages_id_seq', 1, false);


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 219
-- Name: educations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.educations_id_seq', 2, true);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 221
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiences_id_seq', 3, true);


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 217
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 1, true);


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 223
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_id_seq', 11, true);


--
-- TOC entry 4806 (class 2606 OID 25400)
-- Name: contactmessages contactmessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactmessages
    ADD CONSTRAINT contactmessages_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 25360)
-- Name: educations educations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations
    ADD CONSTRAINT educations_pkey PRIMARY KEY (id);


--
-- TOC entry 4799 (class 2606 OID 25375)
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 25344)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 25388)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- TOC entry 4807 (class 1259 OID 25406)
-- Name: idx_contactmessages_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contactmessages_created ON public.contactmessages USING btree ("createdAt");


--
-- TOC entry 4808 (class 1259 OID 25405)
-- Name: idx_contactmessages_leido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contactmessages_leido ON public.contactmessages USING btree (leido);


--
-- TOC entry 4797 (class 1259 OID 25401)
-- Name: idx_educations_orden; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_educations_orden ON public.educations USING btree (orden);


--
-- TOC entry 4800 (class 1259 OID 25402)
-- Name: idx_experiences_orden; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_experiences_orden ON public.experiences USING btree (orden);


--
-- TOC entry 4801 (class 1259 OID 25403)
-- Name: idx_skills_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skills_categoria ON public.skills USING btree (categoria);


--
-- TOC entry 4802 (class 1259 OID 25404)
-- Name: idx_skills_orden; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skills_orden ON public.skills USING btree (orden);


-- Completed on 2025-12-02 15:07:48

--
-- PostgreSQL database dump complete
--

\unrestrict hT3UNZSrj7Ur77u0B418y5eRSpYCulcoIL4igQQqzaEc6W1MdCsaHEdetHgHD4R

