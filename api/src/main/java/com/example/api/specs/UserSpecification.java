package com.example.api.specs;

import com.example.api.domain.entity.User;
import com.example.api.specs.shared.EntitySpecification;
import com.example.api.specs.shared.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class UserSpecification extends EntitySpecification<User> implements Specification<User> {
    public UserSpecification(List<SearchCriteria> criteria) {
        this.criteria = criteria;
    }
}
