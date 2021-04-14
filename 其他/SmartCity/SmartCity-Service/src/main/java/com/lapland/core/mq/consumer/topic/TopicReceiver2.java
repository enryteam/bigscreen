package com.lapland.core.mq.consumer.topic;

import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

/**
 * Topic消息监听器
 * @author zz
 * @date 上午9:29 18-7-25
 */
@Component
public class TopicReceiver2 implements MessageListener {


    @Override
    public void onMessage(Message message) {
        try {
            System.out.println("TopicReceiver2接收到消息:" + ((TextMessage) message).getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

}
