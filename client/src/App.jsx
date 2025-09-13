import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Home,
  Events,
  Barrages,
  ExcelReader,
  NotFound,
  ModuleNotFound,
  Forces,
  Refua,
  RefuaStatusReport,
  WorkEnv,
  Sirens,
} from "@screens";
import { DuplicateForm, EditForm, GenericForm } from "@components";
import {
  barrageFormSchema,
  eventsFormSchema,
  forcesFormSchema,
  sirenEventsFormSchema,
} from "@constants/formSchemas";
import {
  MODULES_ROUTES,
  SCREEN_ROUTES,
  barrageSchema,
  eventSchema,
  barrageFields,
  eventFields,
} from "@constants";
import { ENV_COOKIE_NAME } from "@environment";
import BarrageForm from "@screens/Barrages/BarrageForm";
import MalradForm from "@screens/Refua/MalradForm";
import CritBedsForm from "@screens/Refua/CritBedsForm";
import RefuaReportEditForm from "@screens/Refua/RefuaReportEditForm";
import { useBarrageLabels, useEventLabels } from "@hooks";

function App() {
  const { pathname } = useLocation();

  const isPastLoginPage = () => {
    return !["/", `/${SCREEN_ROUTES.workEnv}`].includes(pathname);
  };

  if (!Cookies.get(ENV_COOKIE_NAME) && isPastLoginPage(pathname)) {
    return <Navigate to={SCREEN_ROUTES.workEnv} />;
  } else if (Cookies.get(ENV_COOKIE_NAME) && !isPastLoginPage(pathname)) {
    return <Navigate to={SCREEN_ROUTES.home} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={SCREEN_ROUTES.workEnv} replace />}
      />
      <Route path={SCREEN_ROUTES.workEnv} element={<WorkEnv />} />
      <Route path={SCREEN_ROUTES.home} element={<Home />}>
        <Route
          index
          element={<Navigate to={MODULES_ROUTES.events} replace />}
        />
        <Route path={MODULES_ROUTES.events}>
          <Route index element={<Events />} />
          <Route
            path=":id"
            element={
              <EditForm
                schema={eventsFormSchema}
                route={MODULES_ROUTES.events}
                identifier="uid"
                name="name"
                method={"PUT"}
              />
            }
          />
          <Route
            path={SCREEN_ROUTES.new}
            element={
              <GenericForm
                route={MODULES_ROUTES.events}
                formSchema={eventsFormSchema}
                title="יצירת אירוע"
                closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.events}`}
                method={"POST"}
              />
            }
          />
          <Route
            path={`${SCREEN_ROUTES.duplicate}/:id`}
            element={
              <DuplicateForm
                schema={eventsFormSchema}
                route={MODULES_ROUTES.events}
                identifier="uid"
                name="name"
                method={"POST"}
                isEvolve={false}
              />
            }
          />
          <Route
            path={`${SCREEN_ROUTES.evolve}/:id`}
            element={
              <DuplicateForm
                schema={eventsFormSchema}
                route={MODULES_ROUTES.events}
                identifier="uid"
                name="name"
                method={"POST"}
                isEvolve={true}
              />
            }
          />
          <Route
            path={SCREEN_ROUTES.load}
            element={
              <ExcelReader
                moduleName={"אירועים"}
                excelColumns={eventFields}
                closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.events}`}
                schemaToValidate={eventSchema}
                useLabels={useEventLabels}
                path="events/bulk"
              />
            }
          />
        </Route>

        <Route path={MODULES_ROUTES.forces}>
          <Route index element={<Forces />} />
          <Route
            path=":id"
            element={
              <EditForm
                schema={forcesFormSchema}
                route={MODULES_ROUTES.forces}
                identifier="uid"
                name="FORCE_UNIT"
                method={"PATCH"}
              />
            }
          />
          <Route
            path={SCREEN_ROUTES.new}
            element={
              <GenericForm
                route={MODULES_ROUTES.forces}
                formSchema={forcesFormSchema}
                title="יצירת כוח"
                closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.forces}`}
                method={"PATCH"}
              />
            }
          />
          <Route
            path={`${SCREEN_ROUTES.duplicate}/:id`}
            element={
              <DuplicateForm
                schema={forcesFormSchema}
                route={MODULES_ROUTES.forces}
                identifier="uid"
                name="FORCE_UNIT"
                method={"PATCH"}
                isEvolve={false}
              />
            }
          />
        </Route>

        <Route path={MODULES_ROUTES.sirens}>
          <Route index element={<Sirens />} />
          <Route
            path={SCREEN_ROUTES.new}
            element={
              <GenericForm
                route={MODULES_ROUTES.sirens}
                formSchema={sirenEventsFormSchema}
                title="יצירת אירוע צופרים"
                closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.sirens}`}
                method={"POST"}
              />
            }
          />
          <Route
            path=":id"
            element={
              <EditForm
                schema={sirenEventsFormSchema}
                route={MODULES_ROUTES.sirens}
                identifier="uid"
                name="name"
                method={"PUT"}
              />
            }
          />
          <Route
            path={`${SCREEN_ROUTES.duplicate}/:id`}
            element={
              <DuplicateForm
                schema={sirenEventsFormSchema}
                route={MODULES_ROUTES.sirens}
                identifier="uid"
                name="name"
                method={"POST"}
                isEvolve={false}
              />
            }
          />
        </Route>

        <Route path={MODULES_ROUTES.barrages}>
          <Route index element={<Barrages />} />
          <Route path={SCREEN_ROUTES.new} element={<BarrageForm />} />
          <Route
            path=":id"
            element={
              <EditForm
                schema={barrageFormSchema}
                route={MODULES_ROUTES.barrages}
                identifier="uid"
                name="missileCategory"
                method={"PUT"}
              />
            }
          />
          <Route
            path={`${SCREEN_ROUTES.duplicate}/:id`}
            element={
              <DuplicateForm
                schema={barrageFormSchema}
                route={MODULES_ROUTES.barrages}
                identifier="uid"
                name="missileCategory"
                method={"POST"}
                isEvolve={false}
              />
            }
          />
          <Route
            path={SCREEN_ROUTES.load}
            element={
              <ExcelReader
                moduleName={"מטחים"}
                excelColumns={barrageFields}
                closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.barrages}`}
                schemaToValidate={barrageSchema}
                useLabels={useBarrageLabels}
                path="barrages/bulk"
              />
            }
          />
        </Route>

        <Route path={MODULES_ROUTES.refua}>
          <Route path="" element={<Refua />}>
            <Route
              path={`statusreports`}
              element={<RefuaStatusReport />}
            />
            <Route
              path={`intervals`}
              element={<></>}
            />
            <Route
              path={`injuries`}
              element={<></>}
            />
          </Route>
          <Route
            path={`reports/malrad/${SCREEN_ROUTES.new}`}
            element={<MalradForm closeLink={`/home/${MODULES_ROUTES.refua}`} />}
          />
          <Route
            path={`reports/beds/${SCREEN_ROUTES.new}`}
            element={
              <CritBedsForm closeLink={`/home/${MODULES_ROUTES.refua}`} />
            }
          />
          <Route
            path="reports/malrad/:id"
            element={
              <RefuaReportEditForm
                closeLink={`/home/${MODULES_ROUTES.refua}`}
                type="malrad"
              />
            }
          />
          <Route
            path="reports/beds/:id"
            element={
              <RefuaReportEditForm
                closeLink={`/home/${MODULES_ROUTES.refua}`}
                type="beds"
              />
            }
          />
        </Route>

        <Route path="*" element={<ModuleNotFound />} />
      </Route>
      <Route path={SCREEN_ROUTES.notFound} element={<NotFound />} />
      <Route
        path="*"
        element={<Navigate to={`/${SCREEN_ROUTES.notFound}`} replace />}
      />
    </Routes>
  );
}

export default App;
