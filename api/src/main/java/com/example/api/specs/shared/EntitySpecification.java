package com.example.api.specs.shared;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;

public abstract class EntitySpecification <T>{
    protected List<SearchCriteria> criteria;

    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        for(SearchCriteria criteria: this.criteria){
            if(criteria.getOperation().equals(SearchOperation.STARTS_WITH)){
                predicates.add(builder.like(
                    builder.lower(root.get(criteria.getKey())),
                        criteria.getValue().toString().toLowerCase() + "%"));
            }else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
            if (criteria.getKey().contains(".")) {
                String[] valueSplited = criteria.getKey().split("\\.");
                predicates.add(builder.equal(
                        root.join(valueSplited[0]).get(valueSplited[1]) , criteria.getValue()));
            } else {
                predicates.add(builder.equal(
                        root.get(criteria.getKey()), criteria.getValue()));
            }
            }
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}
