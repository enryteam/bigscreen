package com.lapland.monitor.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OperLogExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public OperLogExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andTitleIsNull() {
            addCriterion("_title is null");
            return (Criteria) this;
        }

        public Criteria andTitleIsNotNull() {
            addCriterion("_title is not null");
            return (Criteria) this;
        }

        public Criteria andTitleEqualTo(String value) {
            addCriterion("_title =", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotEqualTo(String value) {
            addCriterion("_title <>", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThan(String value) {
            addCriterion("_title >", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThanOrEqualTo(String value) {
            addCriterion("_title >=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThan(String value) {
            addCriterion("_title <", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThanOrEqualTo(String value) {
            addCriterion("_title <=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLike(String value) {
            addCriterion("_title like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotLike(String value) {
            addCriterion("_title not like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleIn(List<String> values) {
            addCriterion("_title in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotIn(List<String> values) {
            addCriterion("_title not in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleBetween(String value1, String value2) {
            addCriterion("_title between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotBetween(String value1, String value2) {
            addCriterion("_title not between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andLevelIsNull() {
            addCriterion("level is null");
            return (Criteria) this;
        }

        public Criteria andLevelIsNotNull() {
            addCriterion("level is not null");
            return (Criteria) this;
        }

        public Criteria andLevelEqualTo(String value) {
            addCriterion("level =", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelNotEqualTo(String value) {
            addCriterion("level <>", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelGreaterThan(String value) {
            addCriterion("level >", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelGreaterThanOrEqualTo(String value) {
            addCriterion("level >=", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelLessThan(String value) {
            addCriterion("level <", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelLessThanOrEqualTo(String value) {
            addCriterion("level <=", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelLike(String value) {
            addCriterion("level like", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelNotLike(String value) {
            addCriterion("level not like", value, "level");
            return (Criteria) this;
        }

        public Criteria andLevelIn(List<String> values) {
            addCriterion("level in", values, "level");
            return (Criteria) this;
        }

        public Criteria andLevelNotIn(List<String> values) {
            addCriterion("level not in", values, "level");
            return (Criteria) this;
        }

        public Criteria andLevelBetween(String value1, String value2) {
            addCriterion("level between", value1, value2, "level");
            return (Criteria) this;
        }

        public Criteria andLevelNotBetween(String value1, String value2) {
            addCriterion("level not between", value1, value2, "level");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNull() {
            addCriterion("user_name is null");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNotNull() {
            addCriterion("user_name is not null");
            return (Criteria) this;
        }

        public Criteria andUserNameEqualTo(String value) {
            addCriterion("user_name =", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotEqualTo(String value) {
            addCriterion("user_name <>", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThan(String value) {
            addCriterion("user_name >", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThanOrEqualTo(String value) {
            addCriterion("user_name >=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThan(String value) {
            addCriterion("user_name <", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThanOrEqualTo(String value) {
            addCriterion("user_name <=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLike(String value) {
            addCriterion("user_name like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotLike(String value) {
            addCriterion("user_name not like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameIn(List<String> values) {
            addCriterion("user_name in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotIn(List<String> values) {
            addCriterion("user_name not in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameBetween(String value1, String value2) {
            addCriterion("user_name between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotBetween(String value1, String value2) {
            addCriterion("user_name not between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andOperTimeIsNull() {
            addCriterion("oper_time is null");
            return (Criteria) this;
        }

        public Criteria andOperTimeIsNotNull() {
            addCriterion("oper_time is not null");
            return (Criteria) this;
        }

        public Criteria andOperTimeEqualTo(Date value) {
            addCriterion("oper_time =", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeNotEqualTo(Date value) {
            addCriterion("oper_time <>", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeGreaterThan(Date value) {
            addCriterion("oper_time >", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("oper_time >=", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeLessThan(Date value) {
            addCriterion("oper_time <", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeLessThanOrEqualTo(Date value) {
            addCriterion("oper_time <=", value, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeIn(List<Date> values) {
            addCriterion("oper_time in", values, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeNotIn(List<Date> values) {
            addCriterion("oper_time not in", values, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeBetween(Date value1, Date value2) {
            addCriterion("oper_time between", value1, value2, "operTime");
            return (Criteria) this;
        }

        public Criteria andOperTimeNotBetween(Date value1, Date value2) {
            addCriterion("oper_time not between", value1, value2, "operTime");
            return (Criteria) this;
        }

        public Criteria andReqIpIsNull() {
            addCriterion("req_ip is null");
            return (Criteria) this;
        }

        public Criteria andReqIpIsNotNull() {
            addCriterion("req_ip is not null");
            return (Criteria) this;
        }

        public Criteria andReqIpEqualTo(String value) {
            addCriterion("req_ip =", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpNotEqualTo(String value) {
            addCriterion("req_ip <>", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpGreaterThan(String value) {
            addCriterion("req_ip >", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpGreaterThanOrEqualTo(String value) {
            addCriterion("req_ip >=", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpLessThan(String value) {
            addCriterion("req_ip <", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpLessThanOrEqualTo(String value) {
            addCriterion("req_ip <=", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpLike(String value) {
            addCriterion("req_ip like", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpNotLike(String value) {
            addCriterion("req_ip not like", value, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpIn(List<String> values) {
            addCriterion("req_ip in", values, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpNotIn(List<String> values) {
            addCriterion("req_ip not in", values, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpBetween(String value1, String value2) {
            addCriterion("req_ip between", value1, value2, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqIpNotBetween(String value1, String value2) {
            addCriterion("req_ip not between", value1, value2, "reqIp");
            return (Criteria) this;
        }

        public Criteria andReqUriIsNull() {
            addCriterion("req_uri is null");
            return (Criteria) this;
        }

        public Criteria andReqUriIsNotNull() {
            addCriterion("req_uri is not null");
            return (Criteria) this;
        }

        public Criteria andReqUriEqualTo(String value) {
            addCriterion("req_uri =", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriNotEqualTo(String value) {
            addCriterion("req_uri <>", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriGreaterThan(String value) {
            addCriterion("req_uri >", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriGreaterThanOrEqualTo(String value) {
            addCriterion("req_uri >=", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriLessThan(String value) {
            addCriterion("req_uri <", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriLessThanOrEqualTo(String value) {
            addCriterion("req_uri <=", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriLike(String value) {
            addCriterion("req_uri like", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriNotLike(String value) {
            addCriterion("req_uri not like", value, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriIn(List<String> values) {
            addCriterion("req_uri in", values, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriNotIn(List<String> values) {
            addCriterion("req_uri not in", values, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriBetween(String value1, String value2) {
            addCriterion("req_uri between", value1, value2, "reqUri");
            return (Criteria) this;
        }

        public Criteria andReqUriNotBetween(String value1, String value2) {
            addCriterion("req_uri not between", value1, value2, "reqUri");
            return (Criteria) this;
        }

        public Criteria andMethodIsNull() {
            addCriterion("method is null");
            return (Criteria) this;
        }

        public Criteria andMethodIsNotNull() {
            addCriterion("method is not null");
            return (Criteria) this;
        }

        public Criteria andMethodEqualTo(String value) {
            addCriterion("method =", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodNotEqualTo(String value) {
            addCriterion("method <>", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodGreaterThan(String value) {
            addCriterion("method >", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodGreaterThanOrEqualTo(String value) {
            addCriterion("method >=", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodLessThan(String value) {
            addCriterion("method <", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodLessThanOrEqualTo(String value) {
            addCriterion("method <=", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodLike(String value) {
            addCriterion("method like", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodNotLike(String value) {
            addCriterion("method not like", value, "method");
            return (Criteria) this;
        }

        public Criteria andMethodIn(List<String> values) {
            addCriterion("method in", values, "method");
            return (Criteria) this;
        }

        public Criteria andMethodNotIn(List<String> values) {
            addCriterion("method not in", values, "method");
            return (Criteria) this;
        }

        public Criteria andMethodBetween(String value1, String value2) {
            addCriterion("method between", value1, value2, "method");
            return (Criteria) this;
        }

        public Criteria andMethodNotBetween(String value1, String value2) {
            addCriterion("method not between", value1, value2, "method");
            return (Criteria) this;
        }

        public Criteria andOperEventIsNull() {
            addCriterion("oper_event is null");
            return (Criteria) this;
        }

        public Criteria andOperEventIsNotNull() {
            addCriterion("oper_event is not null");
            return (Criteria) this;
        }

        public Criteria andOperEventEqualTo(String value) {
            addCriterion("oper_event =", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventNotEqualTo(String value) {
            addCriterion("oper_event <>", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventGreaterThan(String value) {
            addCriterion("oper_event >", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventGreaterThanOrEqualTo(String value) {
            addCriterion("oper_event >=", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventLessThan(String value) {
            addCriterion("oper_event <", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventLessThanOrEqualTo(String value) {
            addCriterion("oper_event <=", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventLike(String value) {
            addCriterion("oper_event like", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventNotLike(String value) {
            addCriterion("oper_event not like", value, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventIn(List<String> values) {
            addCriterion("oper_event in", values, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventNotIn(List<String> values) {
            addCriterion("oper_event not in", values, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventBetween(String value1, String value2) {
            addCriterion("oper_event between", value1, value2, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperEventNotBetween(String value1, String value2) {
            addCriterion("oper_event not between", value1, value2, "operEvent");
            return (Criteria) this;
        }

        public Criteria andOperStatusIsNull() {
            addCriterion("oper_status is null");
            return (Criteria) this;
        }

        public Criteria andOperStatusIsNotNull() {
            addCriterion("oper_status is not null");
            return (Criteria) this;
        }

        public Criteria andOperStatusEqualTo(Byte value) {
            addCriterion("oper_status =", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusNotEqualTo(Byte value) {
            addCriterion("oper_status <>", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusGreaterThan(Byte value) {
            addCriterion("oper_status >", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusGreaterThanOrEqualTo(Byte value) {
            addCriterion("oper_status >=", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusLessThan(Byte value) {
            addCriterion("oper_status <", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusLessThanOrEqualTo(Byte value) {
            addCriterion("oper_status <=", value, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusIn(List<Byte> values) {
            addCriterion("oper_status in", values, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusNotIn(List<Byte> values) {
            addCriterion("oper_status not in", values, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusBetween(Byte value1, Byte value2) {
            addCriterion("oper_status between", value1, value2, "operStatus");
            return (Criteria) this;
        }

        public Criteria andOperStatusNotBetween(Byte value1, Byte value2) {
            addCriterion("oper_status not between", value1, value2, "operStatus");
            return (Criteria) this;
        }

        public Criteria andLogDescIsNull() {
            addCriterion("log_desc is null");
            return (Criteria) this;
        }

        public Criteria andLogDescIsNotNull() {
            addCriterion("log_desc is not null");
            return (Criteria) this;
        }

        public Criteria andLogDescEqualTo(String value) {
            addCriterion("log_desc =", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescNotEqualTo(String value) {
            addCriterion("log_desc <>", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescGreaterThan(String value) {
            addCriterion("log_desc >", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescGreaterThanOrEqualTo(String value) {
            addCriterion("log_desc >=", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescLessThan(String value) {
            addCriterion("log_desc <", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescLessThanOrEqualTo(String value) {
            addCriterion("log_desc <=", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescLike(String value) {
            addCriterion("log_desc like", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescNotLike(String value) {
            addCriterion("log_desc not like", value, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescIn(List<String> values) {
            addCriterion("log_desc in", values, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescNotIn(List<String> values) {
            addCriterion("log_desc not in", values, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescBetween(String value1, String value2) {
            addCriterion("log_desc between", value1, value2, "logDesc");
            return (Criteria) this;
        }

        public Criteria andLogDescNotBetween(String value1, String value2) {
            addCriterion("log_desc not between", value1, value2, "logDesc");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}