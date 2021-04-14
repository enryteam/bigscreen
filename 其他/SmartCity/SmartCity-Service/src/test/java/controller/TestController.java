package controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lapland.core.aop.Log;

@Controller
public class TestController {
    private static final Logger LOG = Logger.getLogger(TestController.class);

    @RequestMapping(value = "/activeMQTest", method = RequestMethod.GET)
    public String activeMQTest(Model model) {
        return "test/activeMQTest";
    }

    @Log(value = "进入guest，此处模拟抛出异常")
    @RequestMapping(value = "/guestError", method = RequestMethod.GET)
    public String guestError(Model model) {
        LOG.info("进入guest的index");
        if (true) {
            throw new RuntimeException();
        }
        return "error/500";
    }

    @Log(value = "进入guest", entry = {"parameter1=参数1", "parameter2=参数2",})
    @RequestMapping(value = "/guest", method = RequestMethod.GET)
    public String guest(Model model, String parameter1, Integer parameter2) {
        LOG.info("进入guest的index");
        return "error/405";
    }
}