--
-- PostgreSQL database dump
--

-- Dumped from database version 11.17
-- Dumped by pg_dump version 14.1

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

SET default_tablespace = '';

--
-- Name: cities; Type: TABLE; Schema: public; Owner: refual
--

CREATE TABLE refactor.cities (
    id integer NOT NULL,
    hfc_district_id integer,
    protected_area_id integer,
    shape public.geography NOT NULL,
    type smallint NOT NULL,
    name character varying(50) NOT NULL,
    wkb bytea NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

