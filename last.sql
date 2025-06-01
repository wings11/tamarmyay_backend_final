--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

-- Started on 2025-05-12 21:01:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 34586)
-- Name: tam_food_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_food_items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    description text
);


ALTER TABLE public.tam_food_items OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 34585)
-- Name: tam_food_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_food_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_food_items_id_seq OWNER TO postgres;

--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 217
-- Name: tam_food_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_food_items_id_seq OWNED BY public.tam_food_items.id;


--
-- TOC entry 222 (class 1259 OID 34605)
-- Name: tam_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_locations (
    id integer NOT NULL,
    building_name character varying(255) NOT NULL
);


ALTER TABLE public.tam_locations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34604)
-- Name: tam_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_locations_id_seq OWNER TO postgres;

--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 221
-- Name: tam_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_locations_id_seq OWNED BY public.tam_locations.id;


--
-- TOC entry 226 (class 1259 OID 34639)
-- Name: tam_order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_order_items (
    id integer NOT NULL,
    order_id integer,
    food_item_id integer,
    quantity integer NOT NULL,
    CONSTRAINT tam_order_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.tam_order_items OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 34638)
-- Name: tam_order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_order_items_id_seq OWNER TO postgres;

--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 225
-- Name: tam_order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_order_items_id_seq OWNED BY public.tam_order_items.id;


--
-- TOC entry 224 (class 1259 OID 34615)
-- Name: tam_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_orders (
    id integer NOT NULL,
    order_type character varying(50) NOT NULL,
    table_number integer,
    building_name character varying(255),
    customer_name character varying(255),
    status character varying(50) DEFAULT 'In Process'::character varying NOT NULL,
    payment_method character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tam_orders_order_type_check CHECK (((order_type)::text = ANY ((ARRAY['dine-in'::character varying, 'delivery'::character varying])::text[]))),
    CONSTRAINT tam_orders_payment_method_check CHECK (((payment_method)::text = ANY ((ARRAY['Cash'::character varying, 'Card'::character varying, 'Mobile'::character varying, NULL::character varying])::text[]))),
    CONSTRAINT tam_orders_status_check CHECK (((status)::text = ANY ((ARRAY['In Process'::character varying, 'Completed'::character varying])::text[])))
);


ALTER TABLE public.tam_orders OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 34614)
-- Name: tam_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_orders_id_seq OWNER TO postgres;

--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 223
-- Name: tam_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_orders_id_seq OWNED BY public.tam_orders.id;


--
-- TOC entry 220 (class 1259 OID 34595)
-- Name: tam_tables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_tables (
    id integer NOT NULL,
    table_number integer NOT NULL,
    is_occupied boolean DEFAULT false
);


ALTER TABLE public.tam_tables OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34594)
-- Name: tam_tables_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_tables_id_seq OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 219
-- Name: tam_tables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_tables_id_seq OWNED BY public.tam_tables.id;


--
-- TOC entry 216 (class 1259 OID 34574)
-- Name: tam_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tam_users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    CONSTRAINT tam_users_role_check CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('cashier'::character varying)::text])))
);


ALTER TABLE public.tam_users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 34573)
-- Name: tam_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tam_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tam_users_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 215
-- Name: tam_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tam_users_id_seq OWNED BY public.tam_users.id;


--
-- TOC entry 4714 (class 2604 OID 34589)
-- Name: tam_food_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_food_items ALTER COLUMN id SET DEFAULT nextval('public.tam_food_items_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 34608)
-- Name: tam_locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_locations ALTER COLUMN id SET DEFAULT nextval('public.tam_locations_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 34642)
-- Name: tam_order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_order_items ALTER COLUMN id SET DEFAULT nextval('public.tam_order_items_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 34618)
-- Name: tam_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_orders ALTER COLUMN id SET DEFAULT nextval('public.tam_orders_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 34598)
-- Name: tam_tables id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_tables ALTER COLUMN id SET DEFAULT nextval('public.tam_tables_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 34577)
-- Name: tam_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_users ALTER COLUMN id SET DEFAULT nextval('public.tam_users_id_seq'::regclass);


--
-- TOC entry 4907 (class 0 OID 34586)
-- Dependencies: 218
-- Data for Name: tam_food_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_food_items (id, name, category, price, description) FROM stdin;
1	Burger	Main	8.99	Classic beef burger
2	Pizza	Main	12.99	Margherita pizza
3	Soda	Drink	2.99	Cola
4	G	Lunch Box	1.00	gg
5	test	မြန်မာ အစားအစာ	10.00	dd
6	J	ဟင်းပွဲ	1.00	g
\.


--
-- TOC entry 4911 (class 0 OID 34605)
-- Dependencies: 222
-- Data for Name: tam_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_locations (id, building_name) FROM stdin;
1	Building A
2	Building B
\.


--
-- TOC entry 4915 (class 0 OID 34639)
-- Dependencies: 226
-- Data for Name: tam_order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_order_items (id, order_id, food_item_id, quantity) FROM stdin;
1	1	1	3
2	1	2	2
3	1	1	2
4	2	5	1
5	5	5	2
6	6	5	1
7	9	4	1
8	10	5	1
9	11	4	1
10	12	4	1
\.


--
-- TOC entry 4913 (class 0 OID 34615)
-- Dependencies: 224
-- Data for Name: tam_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_orders (id, order_type, table_number, building_name, customer_name, status, payment_method, created_at) FROM stdin;
1	dine-in	2	\N	\N	Completed	Mobile	2025-05-12 10:21:10.998613
3	delivery	\N	Building A		In Process	\N	2025-05-12 10:37:47.008304
4	delivery	\N	Building B	GG	In Process	\N	2025-05-12 10:38:04.228507
7	delivery	\N	Building A	G	In Process	\N	2025-05-12 11:19:45.946751
8	delivery	\N	Building A	R	In Process	\N	2025-05-12 11:19:55.724086
9	delivery	\N	Building A	E	In Process	\N	2025-05-12 11:21:13.134888
10	delivery	\N	Building A	gg	In Process	\N	2025-05-12 11:29:32.547728
11	delivery	\N	Building A	bb	In Process	\N	2025-05-12 11:29:54.440299
2	dine-in	2	\N		Completed	Cash	2025-05-12 10:37:39.958516
6	dine-in	3	\N		Completed	Card	2025-05-12 10:39:53.504256
5	dine-in	4	\N		Completed	Mobile	2025-05-12 10:39:49.647096
12	dine-in	1	\N		Completed	Cash	2025-05-12 13:38:10.107104
\.


--
-- TOC entry 4909 (class 0 OID 34595)
-- Dependencies: 220
-- Data for Name: tam_tables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_tables (id, table_number, is_occupied) FROM stdin;
1	1	f
2	2	f
3	3	f
4	4	f
5	5	f
6	6	f
7	7	f
8	8	f
9	9	f
10	10	f
\.


--
-- TOC entry 4905 (class 0 OID 34574)
-- Dependencies: 216
-- Data for Name: tam_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tam_users (id, username, password, role) FROM stdin;
1	admin	$2b$10$qNJeXXhSE562woOj/wA7HeTEYH/M6yvfLYgBWBOB5L3xPhUXlb3dO	admin
2	admin2	$2b$10$Lob6hM6QGGeoVUeuE.OGHeWRyW2CbCpgQZdOnGd99w.8hI5w.j0F2	admin
3	cashier	$2b$10$RPVaoWBIfGk4lw9kKjh9fOyh1lJXXn.9lsPQNSOBqgS2N4bFtUT66	cashier
\.


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 217
-- Name: tam_food_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_food_items_id_seq', 6, true);


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 221
-- Name: tam_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_locations_id_seq', 2, true);


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 225
-- Name: tam_order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_order_items_id_seq', 10, true);


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 223
-- Name: tam_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_orders_id_seq', 12, true);


--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 219
-- Name: tam_tables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_tables_id_seq', 10, true);


--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 215
-- Name: tam_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tam_users_id_seq', 3, true);


--
-- TOC entry 4736 (class 2606 OID 34593)
-- Name: tam_food_items tam_food_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_food_items
    ADD CONSTRAINT tam_food_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 34716)
-- Name: tam_locations tam_locations_building_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_locations
    ADD CONSTRAINT tam_locations_building_name_key UNIQUE (building_name);


--
-- TOC entry 4748 (class 2606 OID 34714)
-- Name: tam_locations tam_locations_building_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_locations
    ADD CONSTRAINT tam_locations_building_name_key1 UNIQUE (building_name);


--
-- TOC entry 4750 (class 2606 OID 34718)
-- Name: tam_locations tam_locations_building_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_locations
    ADD CONSTRAINT tam_locations_building_name_key2 UNIQUE (building_name);


--
-- TOC entry 4752 (class 2606 OID 34610)
-- Name: tam_locations tam_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_locations
    ADD CONSTRAINT tam_locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 2606 OID 34645)
-- Name: tam_order_items tam_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_order_items
    ADD CONSTRAINT tam_order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4754 (class 2606 OID 34627)
-- Name: tam_orders tam_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_orders
    ADD CONSTRAINT tam_orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4738 (class 2606 OID 34601)
-- Name: tam_tables tam_tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_tables
    ADD CONSTRAINT tam_tables_pkey PRIMARY KEY (id);


--
-- TOC entry 4740 (class 2606 OID 34701)
-- Name: tam_tables tam_tables_table_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_tables
    ADD CONSTRAINT tam_tables_table_number_key UNIQUE (table_number);


--
-- TOC entry 4742 (class 2606 OID 34699)
-- Name: tam_tables tam_tables_table_number_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_tables
    ADD CONSTRAINT tam_tables_table_number_key1 UNIQUE (table_number);


--
-- TOC entry 4744 (class 2606 OID 34703)
-- Name: tam_tables tam_tables_table_number_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_tables
    ADD CONSTRAINT tam_tables_table_number_key2 UNIQUE (table_number);


--
-- TOC entry 4728 (class 2606 OID 34582)
-- Name: tam_users tam_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_users
    ADD CONSTRAINT tam_users_pkey PRIMARY KEY (id);


--
-- TOC entry 4730 (class 2606 OID 34692)
-- Name: tam_users tam_users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_users
    ADD CONSTRAINT tam_users_username_key UNIQUE (username);


--
-- TOC entry 4732 (class 2606 OID 34690)
-- Name: tam_users tam_users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_users
    ADD CONSTRAINT tam_users_username_key1 UNIQUE (username);


--
-- TOC entry 4734 (class 2606 OID 34694)
-- Name: tam_users tam_users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_users
    ADD CONSTRAINT tam_users_username_key2 UNIQUE (username);


--
-- TOC entry 4759 (class 2606 OID 34651)
-- Name: tam_order_items tam_order_items_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_order_items
    ADD CONSTRAINT tam_order_items_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.tam_food_items(id);


--
-- TOC entry 4760 (class 2606 OID 34646)
-- Name: tam_order_items tam_order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_order_items
    ADD CONSTRAINT tam_order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.tam_orders(id) ON DELETE CASCADE;


--
-- TOC entry 4757 (class 2606 OID 34719)
-- Name: tam_orders tam_orders_building_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_orders
    ADD CONSTRAINT tam_orders_building_name_fkey FOREIGN KEY (building_name) REFERENCES public.tam_locations(building_name);


--
-- TOC entry 4758 (class 2606 OID 34704)
-- Name: tam_orders tam_orders_table_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tam_orders
    ADD CONSTRAINT tam_orders_table_number_fkey FOREIGN KEY (table_number) REFERENCES public.tam_tables(table_number);


-- Completed on 2025-05-12 21:01:22

--
-- PostgreSQL database dump complete
--

