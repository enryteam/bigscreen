package service.impl;

import service.TestService;

/**
 *
 */
public class TestServiceImpl implements TestService {

    @Override
    public void test() {
        System.out.println("--> service run");
    }

}
