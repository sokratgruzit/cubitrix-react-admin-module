import "./DeveloperApi.css";
import { Visual } from "../Visual";
import { React } from "react";
import { HelpText } from "../HelpText";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState, useMemo, useCallback } from "react";
import { useValidation } from "../../hooks/useValidation";

export const DeveloperApi = ({
  array,
  currentArray,
  setCurrentArray,
  handleSubmit,
  responseActive,
  setResponseActive,
  successResponse,
  failResponse,
  connectButton,
  walletConnect,
  setSuccessResponse,
  developerApiActive,
  setDeveloperApiActive,
  loading,
}) => {
  const [active, setActive] = useState(false);
  const [emptyFields, setEmptyFields] = useState({});
  const [notValidated, setNotValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleEmptyFields = useCallback(
    (inputs) => {
      inputs.map((input) => {
        if (input.required === true && currentArray[input.name].length < 1) {
          setEmptyFields((prev) => ({ ...prev, [input.name]: true }));
        }
        if (input.required === false) {
          setEmptyFields((prev) => ({ ...prev, [input.name]: false }));
        }
      });
    },
    [currentArray],
  );

  const handleSetFields = useCallback((item) => {
    setCurrentArray({});
    setEmptyFields({});
    item.inputs?.map((input) => {
      if (input.required) {
        setCurrentArray((prev) => ({ ...prev, [input.name]: "" }));
      }
    });
    if (item.inputs.length) {
      setDeveloperApiActive((prev) => (prev === item.route ? false : item.route));
      setSuccessResponse({});
      setResponseActive(false);
    }
  }, []);

  const handleInputChange = (e, params) => {
    const { name, validation, onChange } = params;
    const inputValue = e.target.value.trim();
    if (params.validation) {
      let helpText = {
        [name]: {
          validationType: [validation],
          success: `It is valid ${validation}`,
          failure: `must be valid ${validation}`,
        },
      };

      let formError = useValidation({ [name]: inputValue || "" }, helpText);

      let error = formError[name];

      error?.failure && setNotValidated(true);

      if (error?.success || inputValue?.length < 1) {
        setNotValidated(false);
      }

      setFormErrors((prev) => ({ ...prev, ...formError }));
    }

    inputValue?.length > 0 && setEmptyFields((prev) => ({ ...prev, [name]: false }));

    onChange(e);
  };

  const handleInputChangeWithType = (e, params) => {
    const { name, onChange } = params;
    setEmptyFields((prev) => ({ ...prev, [name]: false }));
    let data = {
      target: {
        value: e,
        name,
      },
    };

    onChange(data);
  };

  const notEmptyList = useMemo(
    () => Object.keys(currentArray)?.filter((key) => !currentArray[key]) ?? [],
    [currentArray],
  );

  const handleTryItOut = (route, type, inputs) =>
    notEmptyList.length > 0 ? handleEmptyFields(inputs) : handleSubmit(route, type);

  return (
    <div className={"api-container"}>
      <div className={"api-block"}>
        {array?.map((item, index) => {
          return (
            <div key={index}>
              <Visual
                element={"table-header"}
                label={item.title}
                fontSize={"font-20"}
                customStyles={{ marginBottom: "20px" }}
                buttons={item?.connectWallet ? connectButton : ""}
              />
              <div
                className={`api-items ${
                  !walletConnect && item?.connectWallet == true ? "showGrad" : ""
                }`}
              >
                {item.items.map((apiItem, index) => {
                  return (
                    <div className={"api-item"} key={index}>
                      <div
                        className={"api-item-top"}
                        onClick={() => {
                          handleSetFields(apiItem);
                          setActive(apiItem.route);
                        }}
                      >
                        <h3>{apiItem.description}</h3>
                        <p>{apiItem.route}</p>
                        <div className={"api-item-type"}>
                          <div
                            className={`api-item-type-name ${
                              apiItem.type === "GET" ? "api-get" : "api-post"
                            }`}
                          >
                            {apiItem.type}
                          </div>
                          {!apiItem.inputs.length && (
                            <div className={`get-btn`}>
                              <Button
                                label={
                                  loading &&
                                  responseActive === apiItem.route &&
                                  developerApiActive === apiItem.route
                                    ? "Loading.."
                                    : "Try it out"
                                }
                                size={"btn-sm"}
                                type={"btn-primary"}
                                arrow={"arrow-right"}
                                element={"button"}
                                onClick={() => {
                                  setSuccessResponse({});
                                  setResponseActive(apiItem.route);
                                  setDeveloperApiActive(apiItem.route);
                                  handleTryItOut(
                                    apiItem.route,
                                    apiItem.type,
                                    apiItem.inputs,
                                  );
                                }}
                                disabled={notValidated}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`api-item-params-main ${
                          active === apiItem.route ? "active" : ""
                        }`}
                      >
                        <div className={"api-item-params-ttl"}>
                          <div>Parameters</div>
                          <Button
                            label={
                              loading &&
                              responseActive === apiItem.route &&
                              developerApiActive === apiItem.route
                                ? "Loading.."
                                : "Try it out"
                            }
                            size={"btn-sm"}
                            type={"btn-primary"}
                            arrow={"arrow-right"}
                            element={"button"}
                            onClick={() => {
                              handleTryItOut(apiItem.route, apiItem.type, apiItem.inputs);
                            }}
                            disabled={notValidated}
                          />
                        </div>
                        <div className={"api-item-params-subTtls double"}>
                          <div>Name</div>
                          <div>Description</div>
                        </div>
                        {apiItem.inputs?.map((params, index) => {
                          return (
                            <div
                              className={"api-item-params"}
                              key={apiItem.route + params.name + index}
                            >
                              <div className={"api-params"}>
                                <Input
                                  type={
                                    params.type === "select"
                                      ? "lable-input-select"
                                      : params.type === "upload"
                                      ? "label-input-upload"
                                      : params.type === "date"
                                      ? "date-picker-input"
                                      : params.type === "mobile"
                                      ? "label-input-phone-number"
                                      : "default"
                                  }
                                  inputType={params?.inputType}
                                  label={params.title}
                                  name={params.name}
                                  value={
                                    params.type === "select"
                                      ? currentArray[params?.name] || "Any"
                                      : currentArray[params?.name] || ""
                                  }
                                  onChange={(e) =>
                                    !params.type
                                      ? handleInputChange(e, params)
                                      : handleInputChangeWithType(e, params)
                                  }
                                  emptyFieldErr={
                                    params.required && emptyFields[params?.name]
                                  }
                                  customStyles={{ width: "100%" }}
                                  statusCard={
                                    formErrors[params?.name] &&
                                    currentArray[params?.name]?.length > 0 && (
                                      <HelpText
                                        status={
                                          formErrors[params.name].failure
                                            ? "error"
                                            : "success"
                                        }
                                        title={
                                          formErrors[params.name].failure ||
                                          formErrors[params.name].success
                                        }
                                        fontSize={"font-12"}
                                        icon={true}
                                      />
                                    )
                                  }
                                  onClick={
                                    params.selectType &&
                                    ((e) => handleInputChangeWithType(e, params))
                                  }
                                  selectHandler={(opt) =>
                                    handleInputChangeWithType(opt, params)
                                  }
                                  defaultData={params?.options}
                                  selectType={params?.selectType}
                                  selectLabel={params?.selectLabel}
                                  selectPosition={params?.selectPosition}
                                />
                              </div>
                              <div className={"api-details"}>{params.description}</div>
                            </div>
                          );
                        })}
                      </div>
                      {apiItem.type !== "METAMASK" && (
                        <div
                          className={`api-item-res-container ${
                            !loading &&
                            responseActive === apiItem.route &&
                            developerApiActive === apiItem.route
                              ? "active"
                              : ""
                          }`}
                        >
                          <div className={"api-item-params-ttl"}>
                            <div>{`Response${
                              !Object.keys(successResponse).length ? "" : "s"
                            }`}</div>
                          </div>
                          <div
                            className={"api-item-params-status green"}
                            style={{
                              display: `${
                                !Object.keys(successResponse).length ? "none" : "flex"
                              }`,
                            }}
                          >
                            Successful operation
                          </div>
                          <div
                            className={"api-item-res"}
                            style={{
                              display: `${
                                !Object.keys(successResponse).length ? "none" : "flex"
                              }`,
                            }}
                          >
                            <pre className="json-result">
                              {JSON.stringify(successResponse, null, 2)}
                            </pre>
                          </div>
                          <div className={"api-item-params-status red"}>Error</div>
                          <div className={"api-item-res"}>
                            <pre className="json-result">
                              {JSON.stringify(failResponse, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};